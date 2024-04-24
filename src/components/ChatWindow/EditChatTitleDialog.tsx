import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPenToSquare } from "react-icons/fa6";

import Modal from "@/components/Modal/Modal";
import { GenerationChat } from "@/types/chats";

interface EditChatTitleDialogProps {
    currentTitle: string;
    activeChat: GenerationChat;
    updateChat: (chatId: string, chat: GenerationChat) => void;
}

interface FormData {
    title: string;
}

export default function EditChatTitleDialog({ currentTitle, activeChat, updateChat }: EditChatTitleDialogProps) {
    const { register, handleSubmit, reset } = useForm<FormData>({
        defaultValues: {
            title: currentTitle
        }
    });

    useEffect(() => {
        reset({
            title: currentTitle
        });
    }, [currentTitle, reset]);

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        reset();

        updateChat(activeChat.id, {
            ...activeChat,
            title: data.title
        });
    };

    return (
        <Modal
            modalTitle="Edit chat title"
            triggerContent={<FaPenToSquare size="1rem" />}
            actionButtonLabel="Save"
            onActionButtonClick={async () => {
                await handleSubmit(onSubmit)();
            }}
        >
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Title</span>
                    </div>

                    <input type="text" className="input input-bordered input-sm" {...register("title")} />
                </label>
            </form>
        </Modal>
    );
}
