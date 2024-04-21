import { twJoin } from "tailwind-merge";

import { ChatMessage } from "@/types/chats";

export default function ChatMessageContainer({ chatMessage }: { chatMessage: ChatMessage }) {
    return (
        <div className={twJoin("chat w-fit max-w-xl", chatMessage.userMessage ? "ml-auto chat-end" : "chat-start")}>
            <div className="chat-bubble">
                {chatMessage.imageURL && (
                    <figure>
                        <img src={chatMessage.imageURL} width="256" height="256" alt="" />
                    </figure>
                )}

                <p className="whitespace-pre-wrap">{chatMessage.text}</p>
            </div>
        </div>
    );
}
