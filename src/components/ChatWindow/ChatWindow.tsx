import { PaperPlaneIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Flex, Grid, Heading, IconButton, ScrollArea, TextArea } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";

import { GenerationChat } from "@/types/chats";

import ChatMessageContainer from "./ChatMessageContainer";
import EditChatTitleDialog from "./EditChatTitleDialog";

interface ChatWindowProps {
    activeChat?: GenerationChat | null;
    updateChat: (chatId: string, chat: GenerationChat) => void;
    sendChatMessage: (message: string) => Promise<void>;
    topLeftComponent?: React.ReactNode;
}

interface FormData {
    message: string;
}

export default function ChatWindow({ activeChat, updateChat, sendChatMessage, topLeftComponent }: ChatWindowProps) {
    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        reset();

        await sendChatMessage(data.message);
    };

    return (
        <Flex direction="column" px="4" align="center" justify="center" width="100%">
            <Grid columns="1fr 3fr 1fr" width="100%" justify="center" align="center">
                {topLeftComponent}

                <Flex gap="4" justify="center" align="center" gridColumn="2">
                    <Heading align="center">{activeChat?.title ?? "Start a new conversation"}</Heading>
                    {activeChat && (
                        <EditChatTitleDialog
                            currentTitle={activeChat.title}
                            onSaveAction={(value: string) => {
                                updateChat(activeChat.id, {
                                    ...activeChat,
                                    title: value
                                });
                            }}
                        >
                            <IconButton variant="ghost">
                                <Pencil2Icon width="16" height="16" />
                            </IconButton>
                        </EditChatTitleDialog>
                    )}
                </Flex>
            </Grid>
            <ScrollArea type="auto" scrollbars="vertical">
                <Flex direction="column" gap="4" mx="8">
                    {activeChat?.messages.map((chatMessage, index) => (
                        <ChatMessageContainer key={index} chatMessage={chatMessage} />
                    ))}
                </Flex>
            </ScrollArea>
            <Flex mt="4" width="100%" align="center" justify="center" asChild>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box width="50%" asChild>
                        <TextArea placeholder="Send your message" size="3" {...register("message")} />
                    </Box>
                    <IconButton size="3" ml="2" type="submit">
                        <PaperPlaneIcon height="16" width="16" />
                    </IconButton>
                </form>
            </Flex>
        </Flex>
    );
}
