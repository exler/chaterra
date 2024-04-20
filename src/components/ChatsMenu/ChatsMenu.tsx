import { CrossCircledIcon, MagnifyingGlassIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";

import SiteLogo from "@/assets/logo.png";
import { GenerationChat } from "@/types/chats";

interface ChatsMenuProps {
    chats: GenerationChat[];
    setActiveChatId: (activeChatId: string | null) => void;
    removeChat: (chatId: string) => void;
}

interface FormData {
    searchInput: string;
}

export default function ChatsMenu({ chats, setActiveChatId, removeChat }: ChatsMenuProps) {
    const { register, watch } = useForm<FormData>();

    const searchInput = watch("searchInput");

    return (
        <Flex direction="column">
            <Box mx="auto">
                <img src={SiteLogo} alt="Chaterra" height={50} width={160} />
            </Box>
            <Flex>
                <Box width="100%" asChild>
                    <TextField.Root placeholder="Search your chats..." {...register("searchInput")}>
                        <TextField.Slot>
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                </Box>
                <IconButton ml="2" onClick={() => setActiveChatId(null)}>
                    <PlusCircledIcon height="16" width="16" />
                </IconButton>
            </Flex>
            <Flex direction="column" mt="2" gap="2">
                {chats.map((chat) => {
                    if (searchInput && !chat.title.toLowerCase().includes(searchInput.toLowerCase())) {
                        return null;
                    }

                    return (
                        <Card key={chat.id} onClick={() => setActiveChatId(chat.id)}>
                            <Flex align="center" justify="between">
                                <Text>{chat.title}</Text>
                                <IconButton variant="ghost" color="red" onClick={() => removeChat(chat.id)}>
                                    <CrossCircledIcon height="16" width="16" />
                                </IconButton>
                            </Flex>
                        </Card>
                    );
                })}
            </Flex>
        </Flex>
    );
}
