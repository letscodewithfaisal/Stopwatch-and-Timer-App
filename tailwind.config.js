/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#0E1013',
          900: '#14161A',
          800: '#1B1E24',
          700: '#23262E',
          600: '#2E323C',
        },
        steel: {
          300: '#C8CDD6',
          400: '#9AA1AD',
          500: '#6E7480',
        },
        amber: {
          400: '#FFB020',
          500: '#F5A100',
        },
        cyan: {
          400: '#4FD8E8',
          500: '#2CC0D2',
        },
        alert: {
          500: '#FF5C5C',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        inset: 'inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.4)',
        glowAmber: '0 0 24px rgba(255,176,32,0.35)',
        glowCyan: '0 0 24px rgba(79,216,232,0.35)',
      },
    },
  },
  plugins: [],
}
