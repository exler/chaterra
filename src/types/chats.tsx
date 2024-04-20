export interface ChatMessage {
    imageURL?: string;
    text?: string;
    userMessage: boolean;
}

export enum Model {
    GPT35TURBO = "gpt-3.5-turbo",
    GPT4 = "gpt-4"
}

export enum ImageGenerationQuality {
    STANDARD = "standard",
    HD = "hd"
}

export interface GenerationChat {
    id: string;
    title: string;
    messages: ChatMessage[];
}

export interface TextGenerationChat extends GenerationChat {
    model: Model;
}

export interface ImageGenerationChat extends GenerationChat {
    quality: ImageGenerationQuality;
}
