// /** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "768px",
            xl: "960px",
            "2xl": "1980px",
        },
        container: {
            sm: "100%",
            md: "960px",
            lg: "1024px",
            xl: "1440px",
            "2xl": "calc((100vw - 1680px) / 2)",
        },
        extend: {
            fontFamily: {
                ...fontFamily,
                sans: ["Montserrat", "sans-serif"],
                facundoextralight: ["facundoextralight", "sans-serif"],
                facundobold: ["facundobold", "sans-serif"],
                facundoblack: ["facundoblack", "sans-serif"],
                facundothin: ["facundothin", "sans-serif"],
                facundosemibold: ["facundosemibold", "sans-serif"],
                facundosemiboldNEU: ["facundosemiboldNEU", "sans-serif"],
                facundolight: ["facundolight", "sans-serif"],
            },
        },
    },
    plugins: [],
};
