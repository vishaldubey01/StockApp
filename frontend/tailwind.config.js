/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: "#242424",
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["light"],
            textColor: ["light"],
        },
    },
    plugins: [],
};
