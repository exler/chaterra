import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

import MessageInput from "@/components/MessageInput/MessageInput";

interface ChatWindowProps {
    className?: string;
    generateImage: (message: string) => Promise<string>;
}

export default function ImageWindow({ className, generateImage }: ChatWindowProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [imageURL, setImageURL] = useState<string>("");

    const onSubmitMessage = async (message: string) => {
        setIsLoading(true);

        setImageURL(await generateImage(message));

        setIsLoading(false);
    };

    return (
        <div className={twMerge("flex flex-col items-center justify-center w-full pr-4 lg:px-4", className)}>
            {isLoading ? (
                <>
                    <span className="loading loading-ball loading-lg"></span>
                    <span className="font-bold text-lg text-center">Generating the image...</span>
                </>
            ) : imageURL ? (
                <div className="flex flex-col gap-4">
                    <img src={imageURL} alt="Generated image" className="rounded-lg object-cover w-full h-96" />
                    <button type="button" className="btn btn-primary" onClick={() => setImageURL("")}>
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
