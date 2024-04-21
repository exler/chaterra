import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsSend } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

import { GenerationChat } from "@/types/chats";

import ChatMessageContainer from "./ChatMessageContainer";
import EditChatTitleDialog from "./EditChatTitleDialog";

interface ChatWindowProps {
    className?: string;
    activeChat?: GenerationChat | null;
    updateChat: (chatId: string, chat: GenerationChat) => void;
    sendChatMessage: (message: string) => Promise<void>;
    topLeftComponent?: React.ReactNode;
}

interface FormData {
    message: string;
}

export default function ChatWindow({
    className,
    activeChat,
    updateChat,
    sendChatMessage,
    topLeftComponent
}: ChatWindowProps) {
    const { register, handleSubmit, reset } = useForm<FormData>();

    const bottomRef = useRef<HTMLDivElement>(null);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        reset();

        await sendChatMessage(data.message);

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

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-row items-center justify-center fixed w-full bottom-6"
            >
                <textarea
                    className="textarea textarea-bordered w-1/2"
                    placeholder="Send your message"
                    {...register("message")}
                    onKeyDown={async (e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            await handleSubmit(onSubmit)();
                        }
                    }}
                />
                <button className="btn btn-primary ml-2" type="submit">
                    <BsSend size="1rem" />
                </button>
            </form>
        </div>
    );
}
