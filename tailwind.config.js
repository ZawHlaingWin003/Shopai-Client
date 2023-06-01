/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                'white': "#F8FAFC",//Things
                'light': "#F3F3F8",//Bg
                'soft-light': "#fcfcf8",

                'black': "#252836",//Things
                'dark': "#1F1D2B",//Bg
                'soft-dark': "#2F3142",

                'primary': "#525298",
                'primary': {
                    50: '#f4f5fa',
                    100: '#e6e9f3',
                    200: '#d2d6eb',
                    300: '#b3bcdd',
                    400: '#8f9acb',
                    500: '#747dbd',
                    600: '#6165af',
                    700: '#525298',
                    800: '#4c4a83',
                    900: '#3f3f69',
                }
            },
            fontFamily: {
                'big-title': "Montserrat, sans-serif",
                'title': "Neutra, serif",
                'body': "Satoshi, sans-serif",
            },
            backgroundImage: {
                'about-us': "url(/src/assets/images/about-us.jpg)",
                'new-arrivals': "url(/src/assets/images/table.jpg)",
                'popular-products': "url(/src/assets/images/pot.jpg)",
                'discount': "url(/src/assets/images/leaf-bg.jpg)",
                'subscribe': "url(/public/frontend/assets/bg-4.jpg)"
            },
            keyframes: {
                closeModalOutside: {
                    '0%': {
                        transform: 'scale(1)'
                    },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' }
                }
            },
            animation: {
                closeModalOutside: 'closeModalOutside 1s ease 0s 1 normal forwards',
            }
        },
    },
    plugins: [],
};
