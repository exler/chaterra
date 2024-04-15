import { createBrowserRouter } from "react-router-dom";

import Root from "@/components/Root/Root";
import Chat from "@/routes/Chat";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Chat />
            }
        ]
    }
]);

export default router;
