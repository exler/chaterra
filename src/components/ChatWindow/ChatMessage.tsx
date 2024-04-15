import { Box, Card, Text } from "@radix-ui/themes";

interface ChatMessageProps {
    isSender: boolean;
    children: React.ReactNode;
}

export default function ChatMessage({ isSender, children }: ChatMessageProps) {
    return (
        <Card asChild>
            <Box width="fit-content" ml={isSender ? "auto" : "0"}>
                <Text>{children}</Text>
            </Box>
        </Card>
    );
}
