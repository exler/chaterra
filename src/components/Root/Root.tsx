import "@radix-ui/themes/styles.css";
import "./global.css";

import { Box, Flex, Theme } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";

import MenuBar from "@/components/MenuBar/MenuBar";

export default function Root() {
    return (
        <Theme appearance="dark">
            <Flex height="100dvh" gap="4">
                <MenuBar />
                <Box height="100%" width="100%" py="4">
                    <Outlet />
                </Box>
            </Flex>
        </Theme>
    );
}
