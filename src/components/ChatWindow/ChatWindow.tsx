import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

import MessageInput from "@/components/MessageInput/MessageInput";
import type { ChatMessage, GenerationChat, TextGenerationChat, TextGenerationModel } from "@/types/chats";
import { getChatTitleFromMessage } from "@/utils/chats";
import { base64EncodeImage } from "@/utils/encode";

import ChatMessageContainer from "./ChatMessageContainer";
import EditChatTitleDialog from "./EditChatTitleDialog";

interface ChatWindowProps {
    className?: string;
    missingApiKey?: boolean;
    chatModel: TextGenerationModel;
    activeChat?: TextGenerationChat | null;
    setActiveChatId: (activeChatId: string | null) => void;
    addChat: (chat: TextGenerationChat) => void;
    updateChat: (chatId: string, chat: TextGenerationChat) => void;
    getAIChatResponse: (messages: ChatMessage[]) => Promise<string>;
    topLeftComponent?: React.ReactNode;
    setForceChatWindow: (forceChatWindow: boolean) => void;
}

export default function ChatWindow({
    className,
    missingApiKey,
    chatModel,
    activeChat,
    setActiveChatId,
    addChat,
    updateChat,
    getAIChatResponse,
    topLeftComponent,
    setForceChatWindow,
}: ChatWindowProps) {
    const [waitingForResponse, setWaitingForResponse] = useState(false);

    // Reference to the scrollable container
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
            if (chatContainerRef.current) {
                const container = chatContainerRef.current;
                container.scrollTop = container.scrollHeight;
            }
        });
    };

    const onFormSubmit = async ({ message, imageList }: { message: string; imageList: FileList }) => {
        // Have to store this locally as the activeChat is hydrating
        let chatId: string;
        let messages: ChatMessage[];
        let activeChatLocal: TextGenerationChat;

        const base64EncodedImage =
            imageList && imageList.length > 0 ? await base64EncodeImage(imageList[0]) : undefined;

        if (activeChat) {
            chatId = activeChat.id;
            messages = [
                ...activeChat.messages,
                { id: nanoid(), text: message, userMessage: true, imageURL: base64EncodedImage },
            ];
            activeChatLocal = activeChat;

            updateChat(chatId, {
                ...activeChatLocal,
                messages: messages,
            });
        } else {
            chatId = nanoid();
            messages = [{ id: nanoid(), text: message, userMessage: true, imageURL: base64EncodedImage }];
            activeChatLocal = {
                id: chatId,
                title: getChatTitleFromMessage(message),
                model: chatModel,
                messages: messages,
            };

            addChat(activeChatLocal);
            setActiveChatId(chatId);
        }

        // Scroll into view after sending the message
        scrollToBottom();

        setWaitingForResponse(true);

        const openAITextResponse = await getAIChatResponse(messages);

        setWaitingForResponse(false);

        await updateChat(chatId, {
            ...activeChatLocal,
            messages: [...messages, { id: nanoid(), text: openAITextResponse, userMessage: false }],
        });

        // Scroll into view after showing response
        scrollToBottom();
    };

    return (
        <div className={twMerge("flex flex-col h-screen", className)}>
            <div className="flex-none p-4">
                <div className="lg:grid lg:grid-cols-5 w-full items-center justify-center">
                    <div className="flex flex-row justify-between lg:justify-center">
                        {topLeftComponent}
                        <button
                            type="button"
                            onClick={() => {
                                setActiveChatId(null);
                                setForceChatWindow(false);
                            }}
                            className="btn btn-neutral btn-sm lg:hidden"
                        >
                            Go back
                        </button>
                    </div>

                    <div className="flex flex-row gap-4 items-center justify-center col-span-3 col-start-2">
                        <h1 className="font-bold text-xl text-center mt-2 lg:mt-0">
                            {activeChat?.title ?? "Start a new conversation"}
                        </h1>
                        {activeChat && (
                            <EditChatTitleDialog
                                currentTitle={activeChat.title}
                                activeChat={activeChat}
                                updateChat={updateChat as (chatId: string, chat: GenerationChat) => void}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto px-4" ref={chatContainerRef}>
                    <div className="flex flex-col gap-4 lg:mx-8 pb-40">
                        {activeChat?.messages.map((chatMessage) => (
                            <ChatMessageContainer
                                key={chatMessage.id}
                                className={chatMessage.userMessage ? "ml-auto chat-end" : "chat-start"}
                            >
                                {chatMessage.imageURL && (
                                    <figure>
                                        <img src={chatMessage.imageURL} width="256" height="256" alt="" />
                                    </figure>
                                )}
                                <p>{chatMessage.text}</p>
                            </ChatMessageContainer>
                        ))}
                        {waitingForResponse && (
                            <ChatMessageContainer className="chat-start">
                                <span className="loading loading-dots loading-md" />
                            </ChatMessageContainer>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-none p-4 w-1/2 fixed bottom-6 sm:translate-x-1/4">
                {missingApiKey ? (
                    <div className="alert alert-warning">
                        <IoWarningOutline size="1rem" />
                        <span>
                            You need to set your OpenAI API key in the <Link to="/settings">settings</Link> to use this
                            feature.
                        </span>
                    </div>
                ) : (
                    <MessageInput showImageUpload={true} allowImageUpload={true} onFormSubmit={onFormSubmit} />
                )}
            </div>
        </div>
    );
}
