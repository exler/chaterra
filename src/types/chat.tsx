export interface ChatMessage {
    text: string;
    userMessage: boolean;
}

export type Model = "gpt-3.5-turbo" | "gpt-4";

export interface Chat {
    id: string;
    title: string;
    model: Model;
    messages: ChatMessage[];
}
