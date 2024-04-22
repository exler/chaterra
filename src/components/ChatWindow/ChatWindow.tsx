import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

import MessageInput from "@/components/MessageInput/MessageInput";
import { ChatMessage, GenerationChat, TextGenerationChat, TextGenerationModel } from "@/types/chats";
import { getChatTitleFromMessage } from "@/utils/chats";

import ChatMessageContainer from "./ChatMessageContainer";
import EditChatTitleDialog from "./EditChatTitleDialog";

interface ChatWindowProps {
    className?: string;
    maxResponses?: number;
    chatModel: TextGenerationModel;
    activeChat?: TextGenerationChat | null;
    setActiveChatId: (activeChatId: string | null) => void;
    addChat: (chat: TextGenerationChat) => void;
    updateChat: (chatId: string, chat: TextGenerationChat) => void;
    getAIChatResponse: (messages: ChatMessage[]) => Promise<string>;
    topLeftComponent?: React.ReactNode;
}

export default function ChatWindow({
    className,
    maxResponses,
    chatModel,
    activeChat,
    setActiveChatId,
    addChat,
    updateChat,
    getAIChatResponse,
    topLeftComponent
}: ChatWindowProps) {
    const [waitingForResponse, setWaitingForResponse] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);

    const onSubmitMessage = async (message: string) => {
        // Have to store this locally as the activeChat is hydrating
        let chatId;
        let messages;
        let activeChatLocal;

        if (activeChat) {
            chatId = activeChat.id;
            messages = [...activeChat.messages, { text: message, userMessage: true }];
            activeChatLocal = activeChat;

            updateChat(chatId, {
                ...activeChatLocal,
                messages: messages
            });
        } else {
            chatId = nanoid();
            messages = [{ text: message, userMessage: true }];
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
            <div className="grid grid-cols-5 w-full items-center justify-center pb-4">
                {topLeftComponent}

                <div className="flex flex-row gap-4 items-center justify-center col-span-3 col-start-2">
                    <h1 className="font-bold text-xl text-center">{activeChat?.title ?? "Start a new conversation"}</h1>
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
                <div className="flex flex-col gap-4 mx-8 pb-14">
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

            {maxResponses && activeChat && activeChat.messages.length >= maxResponses ? (
                <div className="alert alert-info w-1/2 fixed bottom-6">
                    <FaCircleInfo size="1rem" />
                    <span>
                        This chat only supports {maxResponses} {maxResponses > 1 ? "responses" : "response"} from the
                        AI.
                    </span>
                </div>
            ) : (
                <MessageInput onSubmitMessage={onSubmitMessage} />
            )}
        </div>
    );
}
