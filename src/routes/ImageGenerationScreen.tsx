import { useState } from "react";

import ImagesMenu from "@/components/ImagesMenu/ImagesMenu";
import ImageWindow from "@/components/ImageWindow/ImageWindow";
import { useUserSettingsStore } from "@/stores/userSettings";
import { ImageGenerationAspectRatio, ImageGenerationQuality } from "@/types/chats";
import { createOpenAIClient, generateImagesWithOpenAI } from "@/utils/openai";

export default function ImageGenerationScreen() {
    const [imageQuality, setImageQuality] = useState<ImageGenerationQuality>(ImageGenerationQuality.STANDARD);
    const [imageAspectRatio, setImageAspectRatio] = useState<ImageGenerationAspectRatio>(
        ImageGenerationAspectRatio.SQUARE
    );
    const [numberOfImages, setNumberOfImages] = useState<number>(1);

    const openAIApiKey = useUserSettingsStore((state) => state.openAIApiKey);
    const openAIClient = createOpenAIClient(openAIApiKey);

    const generateImage = async (message: string) => {
        const openAIImages = await generateImagesWithOpenAI(
            openAIClient,
            "dall-e-3",
            message,
            numberOfImages,
            imageQuality,
            imageAspectRatio
        );

        return openAIImages;
    };

    return (
        <div className="lg:grid lg:grid-cols-5">
            <ImagesMenu
                imageQuality={imageQuality}
                setImageQuality={setImageQuality}
                imageAspectRatio={imageAspectRatio}
                setImageAspectRatio={setImageAspectRatio}
                numberOfImages={numberOfImages}
                setNumberOfImages={setNumberOfImages}
            />
            <ImageWindow className="col-span-4 mt-16 lg:mt-0" generateImage={generateImage} />
        </div>
    );
}
