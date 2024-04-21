/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {}
    },
    plugins: [require("daisyui")],
    // Docs: https://daisyui.com/docs/config/
    daisyui: {
        themes: false,
        darkTheme: "dark",
        base: true,
        styled: true,
        utils: true,
        prefix: "",
        logs: true,
        themeRoot: ":root"
    }
};
