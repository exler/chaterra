import { GearIcon, ImageIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Flex, Link as RadixLink } from "@radix-ui/themes";
import { Link as RouterLink } from "react-router-dom";

export default function MenuBar() {
    return (
        <Flex direction="column" justify="between" my="4" mx="2">
            <Flex direction="column" gap="4">
                <RadixLink asChild>
                    <RouterLink to="/">
                        <Pencil2Icon height="24" width="24" />
                    </RouterLink>
                </RadixLink>
                <RadixLink asChild>
                    <RouterLink to="/images">
                        <ImageIcon height="24" width="24" />
                    </RouterLink>
                </RadixLink>
            </Flex>
            <Flex direction="column">
                <RadixLink asChild>
                    <RouterLink to="/settings">
                        <GearIcon height="24" width="24" />
                    </RouterLink>
                </RadixLink>
            </Flex>
        </Flex>
    );
}
