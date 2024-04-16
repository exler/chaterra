import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Box, Flex, Heading, IconButton, ScrollArea, TextArea } from "@radix-ui/themes";
import OpenAI from "openai";
import { useState } from "react";

import ChatMessage from "./ChatMessage";

interface ChatMessage {
    text: string;
    userMessage: boolean;
}

export default function ChatWindow() {
    const [chatTitle, setChatTitle] = useState<string>("Loading chat...");
    const [chatInput, setChatInput] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

    const openai = new OpenAI({
        apiKey: "not-set",
        dangerouslyAllowBrowser: true
    });

    const sendChatMessage = async () => {
        // `as const` required due to TypeScript
        // extending `role: "user"` to `role: string`
        const prevMessages = chatMessages.map(
            (chatMessage) =>
                ({
                    role: chatMessage.userMessage ? "user" : "assistant",
                    content: chatMessage.text
                }) as const
        );

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [...prevMessages, { role: "user", content: chatInput }]
        });

        setChatMessages((prevChatMessages) => [
            ...prevChatMessages,
            { text: chatInput, userMessage: true },
            { text: chatCompletion.choices[0].message.content ?? "", userMessage: false }
        ]);
    };

    return (
        <Flex direction="column" mx="4" my="4" align="center" justify="center" width="100%">
            <Heading>{chatTitle}</Heading>
            <ScrollArea type="auto" scrollbars="vertical">
                <Flex direction="column" gap="4" mx="8">
                    {chatMessages.map((chatMessage, index) => (
                        <ChatMessage key={index} isSender={chatMessage.userMessage}>
                            {chatMessage.text}
                        </ChatMessage>
                    ))}
                </Flex>
            </ScrollArea>
            <Flex mt="4" width="100%" align="center" justify="center">
                <Box width="50%" asChild>
                    <TextArea
                        placeholder="Send your message"
                        size="3"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                    />
                </Box>
                <IconButton size="3" ml="2" onClick={sendChatMessage}>
                    <PaperPlaneIcon height="16" width="16" />
                </IconButton>
            </Flex>
        </Flex>
    );
}
