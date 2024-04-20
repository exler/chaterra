import { GearIcon, ImageIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";

import MenuLink from "./MenuLink";

export default function MenuBar() {
    return (
        <Flex direction="column" justify="between" my="4" mx="2">
            <Flex direction="column" gap="4">
                <MenuLink to="/" icon={<Pencil2Icon width="24" height="24" />} />
                <MenuLink to="/images" icon={<ImageIcon width="24" height="24" />} />
            </Flex>
            <Flex direction="column">
                <MenuLink to="/settings" icon={<GearIcon width="24" height="24" />} />
            </Flex>
        </Flex>
    );
}
