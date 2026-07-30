/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Wabi-Sabi brand palette */
        paper: "#F8F6F3",
        surface: "#F0EDE8",
        ink: "#2D2A24",
        "ink-soft": "#6B6560",
        "ink-muted": "#8B8178",
        brand: "#B8653A",
        "brand-light": "#F5EDE8",
        "brand-pale": "#E8D5CC",
        taupe: "#B0A89A",
        "today-bg": "#E8E4DE",
        "tab-active": "#E6E0D8",
        "border-light": "#E0DCD4",
        "border-lighter": "#D4CEC6",
        "border-faint": "#E8E4DE",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter Tight", "sans-serif"],
      },
    },
  },
  plugins: [],
};
