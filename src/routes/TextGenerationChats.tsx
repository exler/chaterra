import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

import ChatsMenu from "@/components/ChatsMenu/ChatsMenu";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import SegmentedControl from "@/components/SegmentedControl/SegmentedControl";
import { useTextGenerationChatsStore } from "@/stores/userChats";
import { useUserSettingsStore } from "@/stores/userSettings";
import { GenerationChat, Model } from "@/types/chats";
import { getChatTitleFromMessage } from "@/utils/chats";
import { createOpenAIClient, generateTextWithOpenAI } from "@/utils/openai";

export default function TextGenerationChats() {
    const { textChats, activeChatId, setActiveChatId, addChat, updateChat, removeChat } = useTextGenerationChatsStore();
    const activeChat = textChats.find((chat) => chat.id === activeChatId);

    const openAIApiKey = useUserSettingsStore((state) => state.openAIApiKey);
    const openAIClient = createOpenAIClient(openAIApiKey);

    const [chatModel, setChatModel] = useState<Model>(Model.GPT35TURBO);

    useEffect(() => {
        if (activeChat) {
            setChatModel(activeChat.model);
        } else {
            setChatModel(Model.GPT35TURBO);
        }
    }, [activeChat]);

    const sendChatMessage = async (message: string) => {
        // `as const` required due to TypeScript
        // extending `role: "user"` to `role: string`
        const prevMessages =
            activeChat?.messages.map(
                (chatMessage) =>
                    ({
                        role: chatMessage.userMessage ? "user" : "assistant",
                        content: chatMessage.text ?? ""
                    }) as const
            ) ?? [];

        const openAITextResponse = await generateTextWithOpenAI(openAIClient, chatModel, [
            ...prevMessages,
            { role: "user", content: message }
        ]);

        if (activeChat) {
            updateChat(activeChat.id, {
                ...activeChat,
                messages: [
                    ...activeChat.messages,
                    { text: message, userMessage: true },
                    { text: openAITextResponse, userMessage: false }
                ]
            });
        } else {
            const newId = nanoid();
            addChat({
                id: newId,
                title: getChatTitleFromMessage(message),
                model: chatModel,
                messages: [
                    { text: message, userMessage: true },
                    { text: openAITextResponse, userMessage: false }
                ]
            });
            setActiveChatId(newId);
        }
    };

    return (
        <div className="grid grid-cols-5">
            <ChatsMenu chats={textChats} setActiveChatId={setActiveChatId} removeChat={removeChat} />
            <ChatWindow
                className="col-span-4"
                activeChat={activeChat}
                updateChat={updateChat as (chatId: string, chat: GenerationChat) => void}
                sendChatMessage={sendChatMessage}
                topLeftComponent={
                    <SegmentedControl
                        value={chatModel}
                        onValueChange={(value: string | number) => setChatModel(value as Model)}
                        segments={[
                            { label: "GPT-3.5", value: Model.GPT35TURBO },
                            { label: "GPT-4", value: Model.GPT4 }
                        ]}
                        disabled={!!activeChat}
                    />
                }
            />
        </div>
    );
}
