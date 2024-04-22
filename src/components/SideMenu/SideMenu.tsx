import { twMerge } from "tailwind-merge";

import SiteLogo from "@/assets/logo.png";

interface SideMenuProps {
    className?: string;
    children: React.ReactNode;
}

export default function SideMenu({ className, children }: SideMenuProps) {
    return (
        <div className={twMerge("flex flex-col", className)}>
            <div className="mx-auto flex flex-row items-center gap-4">
                <img src={SiteLogo} alt="Chaterra" height={50} width={160} />
                <div className="badge badge-warning font-bold text-xs cursor-default">PRE-ALPHA</div>
            </div>
            {children}
        </div>
    );
}
