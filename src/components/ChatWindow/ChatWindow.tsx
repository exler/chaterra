import { PaperPlaneIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Flex, Grid, Heading, IconButton, ScrollArea, SegmentedControl, TextArea } from "@radix-ui/themes";
import { nanoid } from "nanoid";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useUseChatsStore } from "@/stores/userChats";
import { useUserSettingsStore } from "@/stores/userSettings";
import { Model } from "@/types/chat";

import ChatMessageContainer from "./ChatMessageContainer";
import EditChatTitleDialog from "./EditChatTitleDialog";

const MAX_CHAT_TITLE_LENGTH = 30;

interface FormData {
    message: string;
}

export default function ChatWindow() {
    const [chatModel, setChatModel] = useState<Model>(Model.GPT35TURBO);

    const { register, handleSubmit, reset } = useForm<FormData>();

    const openAIApiKey = useUserSettingsStore((state) => state.openAIApiKey);
    const { chats, activeChatId, addChat, updateChat, setActiveChatId } = useUseChatsStore();

    const activeChat = chats.find((chat) => chat.id === activeChatId);

    useEffect(() => {
        if (activeChat) {
            setChatModel(activeChat.model);
        } else {
            setChatModel(Model.GPT35TURBO);
        }
    }, [activeChat]);

    const openai = new OpenAI({
        apiKey: openAIApiKey,
        dangerouslyAllowBrowser: true
    });

    const getChatTitleFromMessage = (message: string) => {
        const title = message.split("\n")[0].trim();
        if (title.length > MAX_CHAT_TITLE_LENGTH) {
            return title.slice(0, MAX_CHAT_TITLE_LENGTH) + "...";
        }
        return title;
    };

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
            model: chatModel,
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
                title: getChatTitleFromMessage(data.message),
                model: chatModel,
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
            <Grid columns="1fr 3fr 1fr" width="100%" justify="center" align="center">
                <SegmentedControl.Root value={chatModel} onValueChange={(value: Model) => setChatModel(value)}>
                    <SegmentedControl.Item value={Model.GPT35TURBO}>GPT-3.5</SegmentedControl.Item>
                    <SegmentedControl.Item value={Model.GPT4}>GPT-4</SegmentedControl.Item>
                </SegmentedControl.Root>

                <Flex gap="4" justify="center" align="center">
                    <Heading align="center">{activeChat?.title ?? "Start a new conversation"}</Heading>
                    {activeChat && (
                        <EditChatTitleDialog
                            currentTitle={activeChat.title}
                            onSaveAction={(value: string) => {
                                updateChat(activeChat.id, {
                                    ...activeChat,
                                    title: value
                                });
                            }}
                        >
                            <IconButton variant="ghost">
                                <Pencil2Icon width="16" height="16" />
                            </IconButton>
                        </EditChatTitleDialog>
                    )}
                </Flex>
            </Grid>
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
