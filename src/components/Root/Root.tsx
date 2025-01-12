import "./global.css";

import { Outlet } from "react-router";

import MenuBar from "@/components/MenuBar/MenuBar";

export default function Root() {
    return (
        <div className="flex flex-row h-dvh gap-4">
            <MenuBar />
            <main className="w-full h-full py-4">
                <Outlet />
            </main>
        </div>
    );
}
