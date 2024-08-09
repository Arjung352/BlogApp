/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        worksans: "Work Sans",
        salsa: "salsa",
      },
      colors: {
        OxfordBlue: "#08284e",
        lightBlue: "#3f66dd",
        offWhite: "#f0f0f0",
      },
    },
  },
  plugins: [],
};
