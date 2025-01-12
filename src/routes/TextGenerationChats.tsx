import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import ChatWindow from "@/components/ChatWindow/ChatWindow";
import ChatsMenu from "@/components/ChatsMenu/ChatsMenu";
import SegmentedControl from "@/components/SegmentedControl/SegmentedControl";
import { useTextGenerationChatsStore } from "@/stores/userChats";
import { useUserSettingsStore } from "@/stores/userSettings";
import { type ChatMessage, TextGenerationModel } from "@/types/chats";
import { createOpenAIClient, generateTextWithOpenAI } from "@/utils/openai";

export default function TextGenerationChats() {
    // For mobile view, we need an additional state to control whether we show the chat window or not
    const [forceChatWindow, setForceChatWindow] = useState(false);

    const { textChats, activeChatId, setActiveChatId, addChat, updateChat, removeChat } = useTextGenerationChatsStore();
    const activeChat = textChats.find((chat) => chat.id === activeChatId);

    const openAIApiKey = useUserSettingsStore((state) => state.openAIApiKey);
    const openAIClient = createOpenAIClient(openAIApiKey);

    const [chatModel, setChatModel] = useState<TextGenerationModel>(TextGenerationModel.GPT4OMINI);

    useEffect(() => {
        if (activeChat) {
            setChatModel(activeChat.model);
        } else {
            setChatModel(TextGenerationModel.GPT4OMINI);
        }
    }, [activeChat]);

    const getAIChatResponse = async (messages: ChatMessage[]) => {
        // `as const` required due to TypeScript
        // extending `role: "user"` to `role: string`
        const messagesForOpenAI =
            messages.map(
                (chatMessage) =>
                    ({
                        role: chatMessage.userMessage ? "user" : "assistant",
                        content: [
                            { type: "text", text: chatMessage.text ?? "" },
                            ...(chatMessage.imageURL
                                ? [{ type: "image_url", image_url: { url: chatMessage.imageURL } }]
                                : []),
                        ],
                    }) as const,
            ) ?? [];

        // @ts-expect-error TypeScript is complaining about missing `name` property which is not required
        const openAIChatResponse = await generateTextWithOpenAI(openAIClient, chatModel, messagesForOpenAI);
        return openAIChatResponse;
    };

    return (
        <div className="lg:grid lg:grid-cols-5">
            <ChatsMenu
                className={twMerge("pr-4 lg:pr-0", (activeChat ?? forceChatWindow) && "hidden lg:flex")}
                chats={textChats}
                setActiveChatId={setActiveChatId}
                removeChat={removeChat}
                setForceChatWindow={setForceChatWindow}
            />
            <ChatWindow
                className={twMerge("col-span-4 hidden lg:flex", (activeChat ?? forceChatWindow) && "flex")}
                missingApiKey={!openAIApiKey}
                chatModel={chatModel}
                activeChat={activeChat}
                setActiveChatId={setActiveChatId}
                addChat={addChat}
                updateChat={updateChat}
                getAIChatResponse={getAIChatResponse}
                topLeftComponent={
                    <SegmentedControl
                        className="justify-center lg:mt-2"
                        value={chatModel}
                        onValueChange={(value: string | number) => setChatModel(value as TextGenerationModel)}
                        segments={[
                            { label: "GPT-4o mini", value: TextGenerationModel.GPT4OMINI },
                            { label: "GPT-4o", value: TextGenerationModel.GPT4OMNI },
                        ]}
                        disabled={!!activeChat}
                    />
                }
                setForceChatWindow={setForceChatWindow}
            />
        </div>
    );
}
