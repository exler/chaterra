import { Flex } from "@radix-ui/themes";

import ChatsMenu from "@/components/ChatsMenu/ChatsMenu";
import ChatWindow from "@/components/ChatWindow/ChatWindow";

export default function Chat() {
    return (
        <Flex>
            <ChatsMenu />
            <ChatWindow />
        </Flex>
    );
}
