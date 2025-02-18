import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

import MessageInput from "@/components/MessageInput/MessageInput";

interface ImageWindowProps {
    isGenerating: boolean;
    setIsGenerating: (isGenerating: boolean) => void;
    className?: string;
    missingApiKey?: boolean;
    generateImage: (message: string) => Promise<string[]>;
}

export default function ImageWindow({
    isGenerating,
    setIsGenerating,
    className,
    missingApiKey,
    generateImage,
}: ImageWindowProps) {
    const [prevPrompt, setPrevPrompt] = useState<string>("");
    const [images, setImages] = useState<string[]>([]);

    const onFormSubmit = async ({ message }: { message: string }) => {
        setIsGenerating(true);

        setPrevPrompt(message);
        setImages(await generateImage(message));

        setIsGenerating(false);
    };

    return (
        <div className={twMerge("flex flex-col items-center justify-center w-full pr-4 lg:px-4", className)}>
            {isGenerating ? (
                <>
                    <span className="loading loading-ball loading-lg" />
                    <span className="font-bold text-lg text-center">Generating images...</span>
                </>
            ) : images.length > 0 ? (
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        {images.map((imageURL, index) => (
                            <img
                                key={imageURL}
                                src={imageURL}
                                alt={`AI generation ${index + 1}`}
                                className={twMerge("rounded-lg object-cover w-full h-96", images.length > 2 && "h-48")}
                            />
                        ))}
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => setImages([])}>
                        Generate a new image
                    </button>
                </div>
            ) : missingApiKey ? (
                <div className="alert alert-warning w-1/2 fixed bottom-6">
                    <IoWarningOutline size="1rem" />
                    <span>
                        You need to set your OpenAI API key in the <Link to="/settings">settings</Link> to use this
                        feature.
                    </span>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center w-40 opacity-30">
                        <FaImage size="4rem" />
                        <span className="font-bold text-lg text-center">
                            Describe the image you want to have generated
                        </span>
                    </div>
                    <MessageInput
                        initialMessage={prevPrompt}
                        showImageUpload={false}
                        onFormSubmit={onFormSubmit}
                        className="fixed w-1/2 bottom-6"
                    />
                </>
            )}
        </div>
    );
}
