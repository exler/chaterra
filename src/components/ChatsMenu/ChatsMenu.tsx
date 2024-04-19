import { MagnifyingGlassIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton, TextField } from "@radix-ui/themes";

import SiteLogo from "@/assets/logo.png";

export default function ChatsMenu() {
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
                <IconButton ml="2">
                    <PlusCircledIcon height="16" width="16" />
                </IconButton>
            </Flex>
        </Flex>
    );
}
