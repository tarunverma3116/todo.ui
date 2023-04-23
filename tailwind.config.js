/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#2D2D2D",
          highlight: "#6571FF",
          success: "#1F254A",
          secondary: "#1E2028",
        },
        foreground: {
          primary: "#0F64A3",
          secondary: "#1F254A",
          accent: "#043A62",
        },
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
