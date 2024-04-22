export interface ChatMessage {
    imageURL?: string;
    text?: string;
    userMessage: boolean;
}

export enum TextGenerationModel {
    GPT35TURBO = "gpt-3.5-turbo",
    GPT4 = "gpt-4"
}

export enum ImageGenerationAspectRatio {
    SQUARE = "1024x1024",
    LANDSCAPE = "1792x1024",
    PORTRAIT = "1024x1792"
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
    model: TextGenerationModel;
}
