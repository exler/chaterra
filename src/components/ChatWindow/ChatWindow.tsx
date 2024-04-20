import { PaperPlaneIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Flex, Grid, Heading, IconButton, ScrollArea, TextArea } from "@radix-ui/themes";
import { useRef } from "react";
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

    const bottomRef = useRef<HTMLDivElement>(null);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        reset();

        await sendChatMessage(data.message);

        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Flex direction="column" px="4" align="center" justify="center" width="100%">
            <Grid columns="1fr 3fr 1fr" width="100%" justify="center" align="center" pb="4">
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
            <ScrollArea type="auto" scrollbars="vertical" size="2" style={{ height: 600 }}>
                <Flex direction="column" gap="4" mx="8" pb="5rem">
                    {activeChat?.messages.map((chatMessage, index) => (
                        <ChatMessageContainer key={index} chatMessage={chatMessage} />
                    ))}
                    <div ref={bottomRef} />
                </Flex>
            </ScrollArea>

            <Flex width="100%" align="center" justify="center" position="fixed" bottom="6" asChild>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box width="50%" asChild>
                        <TextArea
                            variant="classic"
                            style={{ background: "black" }}
                            placeholder="Send your message"
                            size="3"
                            {...register("message")}
                            onKeyDown={async (e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    await handleSubmit(onSubmit)();
                                }
                            }}
                        />
                    </Box>
                    <IconButton size="3" ml="2" type="submit">
                        <PaperPlaneIcon height="16" width="16" />
                    </IconButton>
                </form>
            </Flex>
        </Flex>
    );
}
