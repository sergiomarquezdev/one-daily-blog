/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        primary: "#3f51b5", // Color principal de Angular Material
        secondary: "#ff4081", // Color secundario
        background: "#f5f5f5", // Color de fondo
        surface: "#ffffff", // Color de superficie
        error: "#f44336", // Color de error
        onPrimary: "#ffffff", // Color de texto sobre color primario
        onSecondary: "#000000", // Color de texto sobre color secundario
        onBackground: "#000000", // Color de texto sobre fondo
        onSurface: "#000000", // Color de texto sobre superficie
        onError: "#ffffff", // Color de texto sobre error
      },
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
        serif: ["Mohave", "serif"],
      },
    },
  },
  plugins: [],
};
