/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary, #0f5132)",
          hover: "var(--color-primary-hover, #0a3d24)",
          light: "var(--color-primary-light, #f0fdf4)",
          dark: "var(--color-primary-dark, #062f1a)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary, #0d9488)",
          hover: "var(--color-secondary-hover, #0f766e)",
          light: "var(--color-secondary-light, #f0fdfa)",
        },
        accent: {
          DEFAULT: "var(--color-accent, #d97706)",
          hover: "var(--color-accent-hover, #b45309)",
          light: "var(--color-accent-light, #fef3c7)",
        },
        neutral: {
          dark: "var(--color-neutral-dark, #0f172a)",
          body: "var(--color-neutral-body, #334155)",
          muted: "var(--color-neutral-muted, #64748b)",
          light: "var(--color-neutral-light, #f8fafc)",
          border: "var(--color-neutral-border, #e2e8f0)",
        }
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '3xs': ['0.5625rem', { lineHeight: '0.75rem' }],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgb(0 0 0 / 0.03)',
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        premium: '0 4px 20px -2px rgba(15, 81, 50, 0.08), 0 2px 8px -1px rgba(15, 81, 50, 0.04)',
        'premium-hover': '0 12px 30px -4px rgba(15, 81, 50, 0.15), 0 4px 12px -2px rgba(15, 81, 50, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}