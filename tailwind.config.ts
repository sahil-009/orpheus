import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: {
        display: ['"Syne"', "system-ui", "sans-serif"],
        serif:   ['"DM Serif Display"', "Georgia", "serif"],
        body:    ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        // ── Brand — Gold / Black (Orpheus Financial) ─────────────────
        // Strict palette: Gold #D4AF37, Soft Gold #C8A96A, White #FFFFFF, Black #0A0A0A
        gold:    { DEFAULT: "#D4AF37", light: "#C8A96A", pale: "#F7EFD6", ultra: "#FFFFFF", dark: "#A88829" },
        // Legacy "blue" tokens kept as aliases for any class-based usages
        blue:    { DEFAULT: "#D4AF37", light: "#C8A96A", pale: "#F7EFD6", ultra: "#FFFFFF", dark: "#A88829", deep: "#5C4A14", glow: "#D4AF37" },
        sky:     { DEFAULT: "#D4AF37", light: "#C8A96A", pale: "#F7EFD6", ultra: "#FFFFFF", dark: "#A88829" },
        charcoal:{ DEFAULT: "#0A0A0A", mid: "#141414", soft: "#1C1C1C" },
        navy:    "#0A0A0A",
        offwhite:"#FFFFFF",
        ink:     "#0A0A0A",
        muted2:  "#6B6B6B",
        line:        "rgba(212,175,55,0.18)",
        "line-strong": "rgba(212,175,55,0.32)",

        // ── Shadcn ────────────────────────────────────────────────────
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary:    { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary:  { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive:{ DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted:      { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent:     { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover:    { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card:       { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        sidebar: {
          DEFAULT:              "hsl(var(--sidebar-background))",
          foreground:           "hsl(var(--sidebar-foreground))",
          primary:              "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent:               "hsl(var(--sidebar-accent))",
          "accent-foreground":  "hsl(var(--sidebar-accent-foreground))",
          border:               "hsl(var(--sidebar-border))",
          ring:                 "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in":  { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer:    { "0%": { backgroundPosition: "-200% center" }, "100%": { backgroundPosition: "200% center" } },
        marquee:    { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-50%)" } },
        "float-up": { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-12px)" } },
        "spin-slow": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-in":        "fade-in 0.4s ease-out",
        shimmer:          "shimmer 1.6s linear infinite",
        marquee:          "marquee 14s linear infinite",
        "float-up":       "float-up 2.5s ease-in-out infinite",
        "spin-slow":      "spin-slow 9s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
