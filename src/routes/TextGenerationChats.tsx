import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import ChatsMenu from "@/components/ChatsMenu/ChatsMenu";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import SegmentedControl from "@/components/SegmentedControl/SegmentedControl";
import { useTextGenerationChatsStore } from "@/stores/userChats";
import { useUserSettingsStore } from "@/stores/userSettings";
import { ChatMessage, TextGenerationModel } from "@/types/chats";
import { createOpenAIClient, generateTextWithOpenAI } from "@/utils/openai";

export default function TextGenerationChats() {
    const { textChats, activeChatId, setActiveChatId, addChat, updateChat, removeChat } = useTextGenerationChatsStore();
    const activeChat = textChats.find((chat) => chat.id === activeChatId);

    const openAIApiKey = useUserSettingsStore((state) => state.openAIApiKey);
    const openAIClient = createOpenAIClient(openAIApiKey);

    const [chatModel, setChatModel] = useState<TextGenerationModel>(TextGenerationModel.GPT35TURBO);

    useEffect(() => {
        if (activeChat) {
            setChatModel(activeChat.model);
        } else {
            setChatModel(TextGenerationModel.GPT35TURBO);
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
                        content: chatMessage.text ?? ""
                    }) as const
            ) ?? [];

        const openAIChatResponse = await generateTextWithOpenAI(openAIClient, chatModel, messagesForOpenAI);
        return openAIChatResponse;
    };

    return (
        <div className="lg:grid lg:grid-cols-5">
            <ChatsMenu
                className={twMerge("pr-4 lg:pr-0", activeChat && "hidden lg:flex")}
                chats={textChats}
                setActiveChatId={setActiveChatId}
                removeChat={removeChat}
            />
            <ChatWindow
                className={twMerge("col-span-4 hidden lg:flex", activeChat && "flex")}
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
                            { label: "GPT-3.5", value: TextGenerationModel.GPT35TURBO },
                            { label: "GPT-4", value: TextGenerationModel.GPT4 }
                        ]}
                        disabled={!!activeChat}
                    />
                }
            />
        </div>
    );
}
