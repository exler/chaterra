import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton, ScrollArea, TextField } from "@radix-ui/themes";

import ChatMessage from "./ChatMessage";

export default function ChatWindow() {
    return (
        <Flex direction="column" mx="4" my="4" align="center" justify="center" width="100%">
            <Heading>Chat Name</Heading>
            <ScrollArea type="auto" scrollbars="vertical">
                <Flex direction="column" gap="4" mx="8">
                    <ChatMessage isSender={true}>What is the capital of Poland?</ChatMessage>
                    <ChatMessage isSender={false}>The capital of Poland is Warsaw.</ChatMessage>
                    <ChatMessage isSender={true}>Thanks for the help!</ChatMessage>
                </Flex>
            </ScrollArea>
            <Flex>
                <TextField.Root placeholder="Send your message" size="3">
                    <TextField.Slot />
                </TextField.Root>
                <IconButton size="3" ml="2">
                    <PaperPlaneIcon height="16" width="16" />
                </IconButton>
            </Flex>
        </Flex>
    );
}
