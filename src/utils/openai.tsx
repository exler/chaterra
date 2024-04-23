import OpenAI from "openai";

export const createOpenAIClient = (apiKey: string) => {
    return new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
    });
};

export const generateTextWithOpenAI = async (
    client: OpenAI,
    model: string,
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
) => {
    const chatCompletion = await client.chat.completions.create({
        model: model,
        messages: messages
    });
    return chatCompletion.choices[0].message.content ?? "";
};

export const generateImagesWithOpenAI = async (
    client: OpenAI,
    model: string,
    prompt: string,
    n?: number | null,
    quality?: "standard" | "hd",
    size?: "1024x1024" | "1792x1024" | "1024x1792" | null
) => {
    // DALL-E-3 model only supports n=1
    // so we have to make parallel requests for n > 1
    const images = await Promise.all(
        Array.from({ length: n ?? 1 }, async () => {
            const response = await client.images.generate({
                model: model,
                prompt: prompt,
                n: 1,
                quality: quality,
                size: size
            });

            return response.data[0].url!;
        })
    );

    return images;
};
