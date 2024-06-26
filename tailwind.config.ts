import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#23B196",
        tabColor: "#4186E3",
        navColor: "#C4B0FF",
      },
    },
  },
  plugins: [],
} satisfies Config;
