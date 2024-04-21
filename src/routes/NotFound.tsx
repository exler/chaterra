import { Button, Flex, Heading, Section } from "@radix-ui/themes";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
    return (
        <Section>
            <Flex direction="column" align="center" justify="center" gap="4">
                <Heading>Page not found</Heading>
                <RouterLink to="/">
                    <Button type="button">Go to home page</Button>
                </RouterLink>
            </Flex>
        </Section>
    );
}
