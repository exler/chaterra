import { createBrowserRouter } from "react-router-dom";

import Root from "@/components/Root/Root";
import ImageGenerationScreen from "@/routes/ImageGenerationScreen";
import NotFound from "@/routes/NotFound";
import Settings from "@/routes/Settings";
import TextGenerationChats from "@/routes/TextGenerationChats";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "*",
                element: <NotFound />
            },
            {
                index: true,
                element: <TextGenerationChats />
            },
            {
                path: "/images",
                element: <ImageGenerationScreen />
            },
            {
                path: "/settings",
                element: <Settings />
            }
        ]
    }
]);

export default router;
