import { useState } from "react";

import ImagesMenu from "@/components/ImagesMenu/ImagesMenu";
import ImageWindow from "@/components/ImageWindow/ImageWindow";
import { useUserSettingsStore } from "@/stores/userSettings";
import { ImageGenerationAspectRatio, ImageGenerationQuality } from "@/types/chats";
import { createOpenAIClient, generateImageWithOpenAI } from "@/utils/openai";

export default function ImageGenerationScreen() {
    const [imageQuality, setImageQuality] = useState<ImageGenerationQuality>(ImageGenerationQuality.STANDARD);
    const [imageAspectRatio, setImageAspectRatio] = useState<ImageGenerationAspectRatio>(
        ImageGenerationAspectRatio.SQUARE
    );

    const openAIApiKey = useUserSettingsStore((state) => state.openAIApiKey);
    const openAIClient = createOpenAIClient(openAIApiKey);

    const generateImage = async (message: string) => {
        const openAIImageURL = await generateImageWithOpenAI(
            openAIClient,
            "dall-e-3",
            message,
            1,
            imageQuality,
            imageAspectRatio
        );

        return openAIImageURL;
    };

    return (
        <div className="grid grid-cols-5">
            <ImagesMenu
                imageQuality={imageQuality}
                setImageQuality={setImageQuality}
                imageAspectRatio={imageAspectRatio}
                setImageAspectRatio={setImageAspectRatio}
            />
            <ImageWindow className="col-span-4" generateImage={generateImage} />
        </div>
    );
}
