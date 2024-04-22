import { useRef } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

import MessageInput from "@/components/MessageInput/MessageInput";
import { GenerationChat } from "@/types/chats";

import ChatMessageContainer from "./ChatMessageContainer";
import EditChatTitleDialog from "./EditChatTitleDialog";

interface ChatWindowProps {
    className?: string;
    maxResponses?: number;
    activeChat?: GenerationChat | null;
    updateChat: (chatId: string, chat: GenerationChat) => void;
    sendChatMessage: (message: string) => Promise<void>;
    topLeftComponent?: React.ReactNode;
}

export default function ChatWindow({
    className,
    maxResponses,
    activeChat,
    updateChat,
    sendChatMessage,
    topLeftComponent
}: ChatWindowProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    const onSubmitMessage = async (message: string) => {
        await sendChatMessage(message);

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
                            updateChat={updateChat}
                        />
                    )}
                </div>
            </div>
            <div className="w-full h-[38rem] overflow-y-scroll">
                <div className="flex flex-col gap-4 mx-8 pb-14">
                    {activeChat?.messages.map((chatMessage, index) => (
                        <ChatMessageContainer key={index} chatMessage={chatMessage} />
                    ))}
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
