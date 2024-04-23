import { twMerge } from "tailwind-merge";

interface ChatMessageContainerProps {
    className?: string;
    children: React.ReactNode;
}

export default function ChatMessageContainer({ className, children }: ChatMessageContainerProps) {
    return (
        <div className={twMerge("chat w-fit max-w-xl", className)}>
            <div className="chat-bubble flex flex-col gap-4">{children}</div>
        </div>
    );
}
