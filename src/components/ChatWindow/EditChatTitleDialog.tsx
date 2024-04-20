import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditChatTitleDialogProps {
    currentTitle: string;
    onSaveAction: (value: string) => void;
    children: React.ReactNode;
}

interface FormData {
    title: string;
}

export default function EditChatTitleDialog({ currentTitle, onSaveAction, children }: EditChatTitleDialogProps) {
    const { register, handleSubmit, reset } = useForm<FormData>({
        defaultValues: {
            title: currentTitle
        }
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        reset();
        onSaveAction(data.title);
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>{children}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit chat title</Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Title
                            </Text>
                            <TextField.Root {...register("title")} />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button type="submit">Save</Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
}
