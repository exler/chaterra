import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

import MessageInput from "@/components/MessageInput/MessageInput";

interface ChatWindowProps {
    className?: string;
    generateImage: (message: string) => Promise<string[]>;
}

export default function ImageWindow({ className, generateImage }: ChatWindowProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    const onSubmitMessage = async (message: string) => {
        setIsLoading(true);

        setImages(await generateImage(message));

        setIsLoading(false);
    };

    return (
        <div className={twMerge("flex flex-col items-center justify-center w-full pr-4 lg:px-4", className)}>
            {isLoading ? (
                <>
                    <span className="loading loading-ball loading-lg"></span>
                    <span className="font-bold text-lg text-center">Generating images...</span>
                </>
            ) : images.length > 0 ? (
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        {images.map((imageURL, index) => (
                            <img
                                key={index}
                                src={imageURL}
                                alt={`Generated image ${index + 1}`}
                                className={twMerge("rounded-lg object-cover w-full h-96", images.length > 2 && "h-48")}
                            />
                        ))}
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => setImages([])}>
                        Generate a new image
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center w-40 opacity-30">
                        <FaImage size="4rem" />
                        <span className="font-bold text-lg text-center">
                            Describe the image you want to have generated
                        </span>
                    </div>
                    <MessageInput onSubmitMessage={onSubmitMessage} />
                </>
            )}
        </div>
    );
}
