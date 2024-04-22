import { useForm } from "react-hook-form";
import { BsSend } from "react-icons/bs";

interface MessageInputProps {
    onSubmitMessage?: (message: string) => Promise<void>;
}

interface FormData {
    message: string;
}

export default function MessageInput({ onSubmitMessage }: MessageInputProps) {
    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        reset();

        if (onSubmitMessage) {
            await onSubmitMessage(data.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-row items-center justify-center fixed w-full bottom-6"
        >
            <textarea
                className="textarea textarea-bordered w-1/2"
                placeholder="Send your message"
                {...register("message")}
                onKeyDown={async (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        await handleSubmit(onSubmit)();
                    }
                }}
            />
            <button className="btn btn-primary ml-2" type="submit">
                <BsSend size="1rem" />
            </button>
        </form>
    );
}
