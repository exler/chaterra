import { Box, Card, Text } from "@radix-ui/themes";

import { ChatMessage } from "@/types/chats";

export default function ChatMessageContainer({ chatMessage }: { chatMessage: ChatMessage }) {
    return (
        <Card asChild>
            <Box width="fit-content" maxWidth="80%" ml={chatMessage.userMessage ? "auto" : "0"}>
                {chatMessage.imageURL && <img src={chatMessage.imageURL} width="256" height="256" alt="" />}
                <Text as="p" style={{ whiteSpace: "pre-wrap" }}>
                    {chatMessage.text}
                </Text>
            </Box>
        </Card>
    );
}
