import { NavLink } from "react-router-dom";

interface MenuLinkProps {
    to: string;
    icon: React.ReactNode;
}

export default function MenuLink({ to, icon }: MenuLinkProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => ["p-1 rounded-md hover:bg-gray-700", isActive ? "bg-neutral" : ""].join(" ")}
        >
            {icon}
        </NavLink>
    );
}
