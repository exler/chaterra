import { BrowserRouter, Route, Routes } from "react-router";

import Root from "@/components/Root/Root";
import ImageGenerationScreen from "@/routes/ImageGenerationScreen";
import NotFound from "@/routes/NotFound";
import Settings from "@/routes/Settings";
import TextGenerationChats from "@/routes/TextGenerationChats";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />}>
                    <Route index element={<TextGenerationChats />} />
                    <Route path="images" element={<ImageGenerationScreen />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
