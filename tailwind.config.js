/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
    },
    animation: {
      "ping-once": "ping 0.5s linear",
    },
  },
  plugins: [],
};
