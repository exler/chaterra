import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface MenuLinkProps {
    to?: string;
    icon: React.ReactNode;
}

export default function MenuEntry({ to, icon }: MenuLinkProps) {
    return to ? (
        <NavLink
            to={to}
            className={({ isActive }) => twMerge("p-1 rounded-md hover:bg-gray-700", isActive && "bg-neutral")}
        >
            {icon}
        </NavLink>
    ) : (
        <div className="p-1 rounded-md hover:bg-gray-700">{icon}</div>
    );
}
