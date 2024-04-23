import { useForm } from "react-hook-form";
import { BsSend } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import { twMerge } from "tailwind-merge";

interface FormData {
    message: string;
    imageList: FileList;
}

interface MessageInputProps {
    showImageUpload?: boolean;
    allowImageUpload?: boolean;
    onFormSubmit?: (data: FormData) => Promise<void>;
}

export default function MessageInput({ showImageUpload = false, allowImageUpload, onFormSubmit }: MessageInputProps) {
    const { register, handleSubmit, reset, resetField, watch } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        reset();

        if (onFormSubmit) {
            await onFormSubmit(data);
        }
    };

    const imageList = watch("imageList");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="fixed w-1/2 bottom-6">
            <div className="flex flex-col items-center gap-2">
                <div className="flex flex-row items-center w-full">
                    <textarea
                        className="textarea textarea-bordered grow"
                        placeholder="Send your message"
                        {...register("message")}
                        onKeyDown={async (e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                await handleSubmit(onSubmit)();
                            }
                        }}
                    />
                    <button className="relative btn btn-primary ml-2" type="submit">
                        <BsSend size="1rem" />
                    </button>
                </div>
                {showImageUpload && (
                    <div className="self-start flex flex-row gap-2">
                        <label
                            className={!allowImageUpload ? "tooltip tooltip-top" : ""}
                            data-tip="Image uploads are only allowed when using the GPT-4 model."
                        >
                            <input
                                type="file"
                                className="hidden"
                                {...register("imageList")}
                                disabled={!allowImageUpload}
                            />
                            <div className={twMerge("btn btn-primary btn-xs", !allowImageUpload && "btn-disabled")}>
                                <RiImageAddFill size="1rem" />
                            </div>
                        </label>
                        {imageList && imageList.length > 0 && (
                            <div className="self-start p-1 rounded-md border-2 border-neutral">
                                <img
                                    src={URL.createObjectURL(imageList[0])}
                                    alt="Preview"
                                    className="rounded-lg object-cover w-10 h-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => resetField("imageList")}
                                    className="absolute bottom-10 left-[5.2rem] text-error"
                                >
                                    <TiDelete size="1rem" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </form>
    );
}
