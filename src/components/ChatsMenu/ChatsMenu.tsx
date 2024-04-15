import { MagnifyingGlassIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, TextField } from "@radix-ui/themes";

export default function ChatsMenu() {
    return (
        <Flex my="4">
            <TextField.Root placeholder="Search your chats...">
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <IconButton ml="2">
                <PlusCircledIcon height="16" width="16" />
            </IconButton>
        </Flex>
    );
}
