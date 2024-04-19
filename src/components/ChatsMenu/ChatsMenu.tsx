import { CrossCircledIcon, MagnifyingGlassIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, IconButton, Text, TextField } from "@radix-ui/themes";

import SiteLogo from "@/assets/logo.png";
import { useUseChatsStore } from "@/stores/userChats";

export default function ChatsMenu() {
    const { chats, setActiveChatId, removeChat } = useUseChatsStore();

    return (
        <Flex direction="column">
            <Box mx="auto">
                <img src={SiteLogo} alt="Chaterra" height={50} width={160} />
            </Box>
            <Flex>
                <TextField.Root placeholder="Search your chats...">
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
                <IconButton ml="2" onClick={() => setActiveChatId(null)}>
                    <PlusCircledIcon height="16" width="16" />
                </IconButton>
            </Flex>
            <Flex direction="column" mt="2" gap="2">
                {chats.map((chat) => (
                    <Card key={chat.id} onClick={() => setActiveChatId(chat.id)}>
                        <Flex align="center" justify="between">
                            <Text>{chat.title}</Text>
                            <IconButton variant="ghost" color="red" onClick={() => removeChat(chat.id)}>
                                <CrossCircledIcon height="16" width="16" />
                            </IconButton>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </Flex>
    );
}
