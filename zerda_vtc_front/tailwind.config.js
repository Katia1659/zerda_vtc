module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        Nunito: ["Nunito", "serif"],
      },
      colors: {
        indigo: {
          DEFAULT: "#7843E6",
          light: "#FF00FF",
          lighter: "#FF80FF",
          hover: "#FFD9FF",
        },
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")],
  darkMode: "class"
};

