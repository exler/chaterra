import { twMerge } from "tailwind-merge";

interface ChatMessageContainerProps {
    className?: string;
    children: React.ReactNode;
}

export default function ChatMessageContainer({ className, children }: ChatMessageContainerProps) {
    return (
        <div className={twMerge("chat w-full max-w-xl", className)}>
            <div className="chat-bubble break-all whitespace-pre-wrap flex flex-col gap-4">{children}</div>
        </div>
    );
}
