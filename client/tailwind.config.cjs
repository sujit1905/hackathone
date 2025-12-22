/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22c55e", // emerald-500
          soft: "#16a34a",    // emerald-600
          pale: "#bbf7d0",    // emerald-100
        },
      },
      backgroundImage: {
        "gradient-main":
          "radial-gradient(circle at top, rgba(16,185,129,0.25), transparent 55%), radial-gradient(circle at bottom, rgba(34,197,94,0.20), transparent 55%)",
      },

      // 5-line equalizer loader animation
      keyframes: {
        equalize: {
          "0%": { transform: "scaleY(1)" },
          "25%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(0.1)" },
          "75%": { transform: "scaleY(0.6)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        equalize: "equalize 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
