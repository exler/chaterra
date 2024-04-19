import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Box, Flex, Heading, IconButton, ScrollArea, TextArea } from "@radix-ui/themes";
import { nanoid } from "nanoid";
import OpenAI from "openai";
import { SubmitHandler, useForm } from "react-hook-form";

import { useUseChatsStore } from "@/stores/userChats";
import { useUserSettingsStore } from "@/stores/userSettings";

import ChatMessageContainer from "./ChatMessageContainer";

interface FormData {
    message: string;
}

export default function ChatWindow() {
    const { register, handleSubmit, reset } = useForm<FormData>();

    const openAIApiKey = useUserSettingsStore((state) => state.openAIApiKey);
    const { chats, activeChatId, addChat, updateChat, setActiveChatId } = useUseChatsStore();

    const activeChat = chats.find((chat) => chat.id === activeChatId);

    const openai = new OpenAI({
        apiKey: openAIApiKey,
        dangerouslyAllowBrowser: true
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        reset();

        // `as const` required due to TypeScript
        // extending `role: "user"` to `role: string`
        const prevMessages =
            activeChat?.messages.map(
                (chatMessage) =>
                    ({
                        role: chatMessage.userMessage ? "user" : "assistant",
                        content: chatMessage.text
                    }) as const
            ) ?? [];

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [...prevMessages, { role: "user", content: data.message }]
        });

        if (activeChat) {
            updateChat(activeChat.id, {
                ...activeChat,
                messages: [
                    ...activeChat.messages,
                    { text: data.message, userMessage: true },
                    { text: chatCompletion.choices[0].message.content ?? "", userMessage: false }
                ]
            });
        } else {
            const newId = nanoid();
            addChat({
                id: newId,
                title: "New Chat",
                model: "gpt-3.5-turbo",
                messages: [
                    { text: data.message, userMessage: true },
                    { text: chatCompletion.choices[0].message.content ?? "", userMessage: false }
                ]
            });
            setActiveChatId(newId);
        }
    };

    return (
        <Flex direction="column" mx="4" align="center" justify="center" width="100%">
            <Heading>{activeChat?.title ?? "Start a new conversation"}</Heading>
            <ScrollArea type="auto" scrollbars="vertical">
                <Flex direction="column" gap="4" mx="8">
                    {activeChat?.messages.map((chatMessage, index) => (
                        <ChatMessageContainer key={index} userMessage={chatMessage.userMessage}>
                            {chatMessage.text}
                        </ChatMessageContainer>
                    ))}
                </Flex>
            </ScrollArea>
            <Flex mt="4" width="100%" align="center" justify="center" asChild>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box width="50%" asChild>
                        <TextArea placeholder="Send your message" size="3" {...register("message")} />
                    </Box>
                    <IconButton size="3" ml="2" type="submit">
                        <PaperPlaneIcon height="16" width="16" />
                    </IconButton>
                </form>
            </Flex>
        </Flex>
    );
}
