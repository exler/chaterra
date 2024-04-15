import { GearIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Flex, Link as RadixLink } from "@radix-ui/themes";
import { Link as RouterLink } from "react-router-dom";

export default function MenuBar() {
    return (
        <Flex direction="column" justify="between" my="4" mx="2">
            <Flex>
                <RadixLink asChild>
                    <RouterLink to="/">
                        <Pencil2Icon height="32" width="32" />
                    </RouterLink>
                </RadixLink>
            </Flex>
            <Flex>
                <RadixLink asChild>
                    <RouterLink to="/settings">
                        <GearIcon height="32" width="32" />
                    </RouterLink>
                </RadixLink>
            </Flex>
        </Flex>
    );
}
