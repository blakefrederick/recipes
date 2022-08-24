module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
    },
    colors: {
      background: "#FFFFFA",
      primary: "#00000",
      secondary: "#9E9E9E",
      active: "#8EC298",
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
