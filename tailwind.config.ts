/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--color-primary))",
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        muted: "hsl(var(--color-muted))",
        'muted-foreground': "hsl(var(--color-muted-foreground))",
        card: "hsl(var(--color-card))",
        destructive: "hsl(var(--color-destructive))",
      },
    },
  },
  plugins: [],
}

