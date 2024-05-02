import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import MessageInput from "@/components/MessageInput/MessageInput";
import { ChatMessage, GenerationChat, TextGenerationChat, TextGenerationModel } from "@/types/chats";
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
    setForceChatWindow
}: ChatWindowProps) {
    const [waitingForResponse, setWaitingForResponse] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);

    const onFormSubmit = async ({ message, imageList }: { message: string; imageList: FileList }) => {
        // Have to store this locally as the activeChat is hydrating
        let chatId;
        let messages;
        let activeChatLocal;

        const base64EncodedImage =
            imageList && imageList.length > 0 ? await base64EncodeImage(imageList[0]) : undefined;

        if (activeChat) {
            chatId = activeChat.id;
            messages = [...activeChat.messages, { text: message, userMessage: true, imageURL: base64EncodedImage }];
            activeChatLocal = activeChat;

            updateChat(chatId, {
                ...activeChatLocal,
                messages: messages
            });
        } else {
            chatId = nanoid();
            messages = [{ text: message, userMessage: true, imageURL: base64EncodedImage }];
            activeChatLocal = {
                id: chatId,
                title: getChatTitleFromMessage(message),
                model: chatModel,
                messages: messages
            };

            addChat(activeChatLocal);
            setActiveChatId(chatId);
        }

        setWaitingForResponse(true);

        const openAITextResponse = await getAIChatResponse(messages);

        setWaitingForResponse(false);

        updateChat(chatId, {
            ...activeChatLocal,
            messages: [...messages, { text: openAITextResponse, userMessage: false }]
        });

        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={twMerge("flex flex-col items-center justify-center w-full px-4", className)}>
            <div className="lg:grid lg:grid-cols-5 w-full items-center justify-center pb-4">
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
            <div className="w-full h-[38rem] overflow-y-scroll">
                <div className="flex flex-col gap-4 lg:mx-8 pb-14">
                    {activeChat?.messages.map((chatMessage, index) => (
                        <ChatMessageContainer
                            key={index}
                            className={chatMessage.userMessage ? "ml-auto chat-end" : "chat-start"}
                        >
                            {chatMessage.imageURL && (
                                <figure>
                                    <img src={chatMessage.imageURL} width="256" height="256" alt="" />
                                </figure>
                            )}

                            <p className="whitespace-pre-wrap">{chatMessage.text}</p>
                        </ChatMessageContainer>
                    ))}
                    {waitingForResponse && (
                        <ChatMessageContainer className="chat-start">
                            <span className="loading loading-dots loading-md"></span>
                        </ChatMessageContainer>
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>

            {missingApiKey ? (
                <div className="alert alert-warning w-1/2 fixed bottom-6">
                    <IoWarningOutline size="1rem" />
                    <span>
                        You need to set your OpenAI API key in the <Link to="/settings">settings</Link> to use this
                        feature.
                    </span>
                </div>
            ) : (
                <MessageInput
                    showImageUpload={true}
                    allowImageUpload={chatModel === TextGenerationModel.GPT4TURBO}
                    onFormSubmit={onFormSubmit}
                />
            )}
        </div>
    );
}
