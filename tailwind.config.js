module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            body: ['Montserrat'],
        },
        extend: {
            colors: {
                'light-gray-100': 'rgb(242,242,242)',
                'lighter-black-300': '#4f4f4f',
                primary: {
                    500: '#d95550',
                    400: '#dd6662',
                    350: '#d6706d',
                    300: '#FF8787',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
