/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
    },
    extend: {
      keyframes: {
        "loader-pulse": {
          "0%, 20%, 80%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0)" },
        },
      },
      animation: {
        "loader-pulse": "loader-pulse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
