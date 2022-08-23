module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
    },
    colors: {
      background: "#FFFFFF",
      primary: "#00000",
      secondary: "#9E9E9E",
      active: "#8ec298",
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
