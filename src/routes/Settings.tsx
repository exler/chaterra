import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";

import { useUserSettingsStore } from "@/stores/userSettings";

interface FormData {
    openAIApiKey: string;
}

export default function Settings() {
    const { register, handleSubmit, setValue } = useForm<FormData>();
    const [showUpdated, setShowUpdated] = useState(false);

    const { openAIApiKey, setOpenAIApiKey } = useUserSettingsStore();

    useEffect(() => {
        setValue("openAIApiKey", openAIApiKey);
    }, [setValue, openAIApiKey]);

    const handleShowUpdated = () => {
        setShowUpdated(true);
        setTimeout(() => {
            setShowUpdated(false);
        }, 3000);
    };

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setOpenAIApiKey(data.openAIApiKey);
        handleShowUpdated();
    };

    return (
        <div className="flex flex-col items-center h-full justify-between pr-4 lg:pr-0">
            <div className="flex flex-col items-center gap-8 w-full">
                <h1 className="font-bold text-2xl">Settings</h1>
                <section className="w-full lg:w-1/3">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        {showUpdated && (
                            <div role="alert" className="alert alert-success">
                                <IoCheckmarkCircle size="1.5rem" />
                                <span>Your settings have been updated!</span>
                            </div>
                        )}

                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">OpenAI API Key</span>
                            </div>

                            <div className="input input-bordered input-sm flex items-center gap-2">
                                <FaKey size="1rem" />
                                <input type="text" className="grow" {...register("openAIApiKey")} />
                            </div>
                            <span className="text-xs mt-2">
                                API key can be obtained from the{" "}
                                <a
                                    href="https://platform.openai.com/api-keys"
                                    className="link"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    OpenAI Platform
                                </a>
                                .
                            </span>
                        </label>

                        <button type="submit" className="btn btn-sm btn-primary">
                            Update
                        </button>
                    </form>
                </section>
            </div>
            <p className="opacity-80">
                Data is stored locally in your browser. Keys are only used to communicate with OpenAI.
            </p>
        </div>
    );
}
