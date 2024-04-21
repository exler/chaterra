import { BsChatLeftDots } from "react-icons/bs";
import { FaGears, FaImage } from "react-icons/fa6";

import MenuLink from "./MenuLink";

export default function MenuBar() {
    return (
        <nav className="flex flex-col justify-between my-4 mx-2">
            <div className="flex flex-col gap-4">
                <MenuLink to="/" icon={<BsChatLeftDots size="1.5rem" />} />
                <MenuLink to="/images" icon={<FaImage size="1.5rem" />} />
            </div>
            <div className="flex flex-col gap-4">
                <MenuLink to="/settings" icon={<FaGears size="1.5rem" />} />
            </div>
        </nav>
    );
}
