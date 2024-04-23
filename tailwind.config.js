/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Roboto", "sans-serif"]
        }
    },
    plugins: [require("daisyui")],
    // Docs: https://daisyui.com/docs/config/
    daisyui: {
        themes: ["sunset"],
        base: true,
        styled: true,
        utils: true,
        prefix: "",
        logs: true,
        themeRoot: ":root"
    }
};
