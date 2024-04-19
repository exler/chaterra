import { createBrowserRouter } from "react-router-dom";

import Root from "@/components/Root/Root";
import Chat from "@/routes/Chat";
import Settings from "@/routes/Settings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Chat />
            },
            {
                path: "/settings",
                element: <Settings />
            }
        ]
    }
]);

export default router;
