import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa6";

import { useUserSettingsStore } from "@/stores/userSettings";

interface FormData {
    openAIApiKey: string;
}

export default function Settings() {
    const { openAIApiKey, setOpenAIApiKey } = useUserSettingsStore();

    const { register, handleSubmit, setValue } = useForm<FormData>();

    useEffect(() => {
        setValue("openAIApiKey", openAIApiKey);
    }, [setValue, openAIApiKey]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setOpenAIApiKey(data.openAIApiKey);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="font-bold text-2xl">Settings</h1>
            <section className="w-1/3">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">OpenAI API Key</span>
                        </div>

                        <div className="input input-bordered input-sm flex items-center gap-2">
                            <FaKey size="1rem" />
                            <input type="text" className="grow" {...register("openAIApiKey")} />
                        </div>
                    </label>

                    <button type="submit" className="btn btn-sm btn-primary">
                        Update
                    </button>
                </form>
            </section>
        </div>
    );
}
