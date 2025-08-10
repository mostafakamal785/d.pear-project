/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        card: "0.75rem",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 2px 6px rgba(0,0,0,0.1)", 
      },
      colors: {
        brand: {
          600: "#6d28d9",
          700: "#4c1d95",
          900: "#2e1065",
        },
        ink: {
          100: "#f3f4f6",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};
