/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { colors: { primary: "#0cadc1" } },
  },
  plugins: [require("@tailwindcss/forms")],
};
