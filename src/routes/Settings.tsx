import { LockOpen1Icon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Section, Text, TextField } from "@radix-ui/themes";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
        <Flex justify="center" align="center" direction="column">
            <Heading>Settings</Heading>
            <Section width="30%">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction="column" gap="4">
                        <label>
                            <Text>OpenAI API Key</Text>
                            <TextField.Root placeholder="Add your OpenAI key..." {...register("openAIApiKey")}>
                                <TextField.Slot>
                                    <LockOpen1Icon width="16" height="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        </label>
                        <Button type="submit">Update</Button>
                    </Flex>
                </form>
            </Section>
        </Flex>
    );
}
