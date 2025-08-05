import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        // Custom colors for the fashion theme
        "ilary-peach": "#FFE5D9",
        "ilary-peachLight": "#FFF2ED",
        "ilary-button": "#F4A261",
        "ilary-buttonHover": "#E76F51",
        "ilary-border": "#E9C46A",
        "ilary-accent": "#2A9D8F",
        "ilary-dark": "#264653",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Custom animations for the fashion theme
        float1: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.7" },
          "50%": { transform: "translateY(-10px) rotate(180deg)", opacity: "1" },
        },
        float2: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.5" },
          "50%": { transform: "translateY(-15px) rotate(-180deg)", opacity: "1" },
        },
        float3: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.6" },
          "50%": { transform: "translateY(-8px) rotate(90deg)", opacity: "1" },
        },
        float4: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.8" },
          "50%": { transform: "translateY(-12px) rotate(-90deg)", opacity: "1" },
        },
        float5: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.4" },
          "50%": { transform: "translateY(-20px) rotate(270deg)", opacity: "1" },
        },
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        tilt: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(1deg)" },
          "75%": { transform: "rotate(-1deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Custom animations
        float1: "float1 3s ease-in-out infinite",
        float2: "float2 3.5s ease-in-out infinite",
        float3: "float3 2.8s ease-in-out infinite",
        float4: "float4 3.2s ease-in-out infinite",
        float5: "float5 2.5s ease-in-out infinite",
        shine: "shine 1.5s ease-in-out",
        tilt: "tilt 10s infinite linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
