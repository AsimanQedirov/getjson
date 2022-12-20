/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./pages/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'main-bg': '#F4F1F8',
                'main-border': '#3e3f5c',
                'input-bg': '#FFFFFF5B',
                'input-border': '#0000000A',
                'dark-border': '#707B8B',
                'dark-text': '#CBD5E0'
            },
            boxShadow: {
                '3xl': '10px 10px 70px rgba(32, 32, 32, 0.1)',
            },
            animation: {
                contentLoad:'contentLoad 1s ease-in-out',
                fadeIn : 'fadeIn 0.5s ease-in-out'
            },
            keyframes: {
                'contentLoad': {
                    '0%': {transform: 'translateY(100px)', opacity: 0},
                    '100%': {transform: 'translateY(0px)', opacity: 1},
                },
                'fadeIn': {
                    '0%': {scale: 0 , opacity : 0},
                    '100%': {scale: 1,opacity : 1}
                }
            }
        },

    },
    variants: {
        extend: {
            display: ['group-focus']
        }
    },
    plugins: [],
}
