import React from "react";
import ReactDOM from "react-dom/client";

import Router from "@/router";

const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <Router />
        </React.StrictMode>,
    );
}
