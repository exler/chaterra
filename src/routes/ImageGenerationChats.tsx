import { Grid, SegmentedControl } from "@radix-ui/themes";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

import ChatsMenu from "@/components/ChatsMenu/ChatsMenu";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import { useImageGenerationChatsStore } from "@/stores/userChats";
import { useUserSettingsStore } from "@/stores/userSettings";
import { GenerationChat, ImageGenerationQuality } from "@/types/chats";
import { getChatTitleFromMessage } from "@/utils/chats";
import { createOpenAIClient, generateImageWithOpenAI } from "@/utils/openai";

export default function ImageGenerationChats() {
    const { imageChats, activeChatId, setActiveChatId, addChat, updateChat, removeChat } =
        useImageGenerationChatsStore();
    const activeChat = imageChats.find((chat) => chat.id === activeChatId);

    const openAIApiKey = useUserSettingsStore((state) => state.openAIApiKey);
    const openAIClient = createOpenAIClient(openAIApiKey);

    const [imageQuality, setImageQuality] = useState<ImageGenerationQuality>(ImageGenerationQuality.STANDARD);

    useEffect(() => {
        if (activeChat) {
            setImageQuality(activeChat.quality);
        } else {
            setImageQuality(ImageGenerationQuality.STANDARD);
        }
    }, [activeChat]);

    const sendChatMessage = async (message: string) => {
        const openAIImageURLResponse = await generateImageWithOpenAI(
            openAIClient,
            "dall-e-2",
            message,
            1,
            imageQuality,
            "1024x1024"
        );

        if (activeChat) {
            updateChat(activeChat.id, {
                ...activeChat,
                messages: [
                    ...activeChat.messages,
                    { text: message, userMessage: true },
                    { imageURL: openAIImageURLResponse, userMessage: false }
                ]
            });
        } else {
            const newId = nanoid();
            addChat({
                id: newId,
                title: getChatTitleFromMessage(message),
                quality: imageQuality,
                messages: [
                    { text: message, userMessage: true },
                    { imageURL: openAIImageURLResponse, userMessage: false }
                ]
            });
            setActiveChatId(newId);
        }
    };

    return (
        <Grid columns="1fr 4fr">
            <ChatsMenu chats={imageChats} setActiveChatId={setActiveChatId} removeChat={removeChat} />
            <ChatWindow
                activeChat={activeChat}
                updateChat={updateChat as (chatId: string, chat: GenerationChat) => void}
                sendChatMessage={sendChatMessage}
                topLeftComponent={
                    <SegmentedControl.Root
                        value={imageQuality}
                        onValueChange={(value: ImageGenerationQuality) => setImageQuality(value)}
                    >
                        <SegmentedControl.Item value={ImageGenerationQuality.STANDARD}>Standard</SegmentedControl.Item>
                        <SegmentedControl.Item value={ImageGenerationQuality.HD}>HD</SegmentedControl.Item>
                    </SegmentedControl.Root>
                }
            />
        </Grid>
    );
}
