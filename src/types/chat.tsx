export interface ChatMessage {
    text: string;
    userMessage: boolean;
}

export enum Model {
    GPT35TURBO = "gpt-3.5-turbo",
    GPT4 = "gpt-4"
}

export interface Chat {
    id: string;
    title: string;
    model: Model;
    messages: ChatMessage[];
}
