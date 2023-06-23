// /** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "768px",
            xl: "1024px",
            "2xl": "1440px",
        },
        container: {
            padding: "14rem",
            screens: {
                sm: "640px",
                md: "768px",
                lg: "768px",
                xl: "960px",
                "2xl": "1240px",
            },
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
    corePlugins: {
        container: false,
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                ".container": {
                    maxWidth: "100%",
                    "@screen sm": {
                        maxWidth: "440px",
                    },
                    "@screen md": {
                        maxWidth: "568px",
                    },
                    "@screen lg": {
                        maxWidth: "660px",
                    },
                    "@screen xl": {
                        maxWidth: "760px",
                    },
                },
            });
        },
    ],
};
