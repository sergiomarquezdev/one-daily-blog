module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A1D23", // Azul profundo
        secondary: "#FF9900", // Naranja vibrante
        background: "#FFFFFF", // Gris claro
        surface: "#FFFFFF", // Blanco
        error: "#E91E63", // Rojo de error
        onPrimary: "#FFFFFF", // Blanco sobre azul profundo
        onSecondary: "#000000", // Negro sobre naranja vibrante
        onBackground: "#000000", // Negro sobre gris claro
        onSurface: "#000000", // Negro sobre blanco
        onError: "#FFFFFF", // Blanco sobre rojo de error
      },
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
        serif: ["Mohave", "serif"],
      },
    },
  },
  plugins: [],
};
