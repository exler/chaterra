import { Box, Link as RadixLink } from "@radix-ui/themes";
import { NavLink as RouterNavLink } from "react-router-dom";

interface MenuLinkProps {
    to: string;
    icon: React.ReactNode;
}

export default function MenuLink({ to, icon }: MenuLinkProps) {
    return (
        <RadixLink underline="none" asChild>
            <RouterNavLink to={to}>
                <Box m="1" asChild>
                    {icon}
                </Box>
            </RouterNavLink>
        </RadixLink>
    );
}
