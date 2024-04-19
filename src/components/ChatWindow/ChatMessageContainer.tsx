import { Box, Card, Text } from "@radix-ui/themes";

interface ChatMessageProps {
    userMessage: boolean;
    children: React.ReactNode;
}

export default function ChatMessage({ userMessage, children }: ChatMessageProps) {
    return (
        <Card asChild>
            <Box width="fit-content" maxWidth="80%" ml={userMessage ? "auto" : "0"}>
                <Text>{children}</Text>
            </Box>
        </Card>
    );
}
