/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#D92D2D',
          'dark-green': '#B71C1C',
          teal: '#1E3A8A',
          orange: '#0F172A',
          'orange-hover': '#1D4ED8',
        },
        ekta: {
          bg: 'var(--bg-primary)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-surface-elevated)',
          card: 'var(--bg-surface-card)',
          border: 'var(--border-subtle)',
          'border-strong': 'var(--border-strong)',
          text: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        industrial: {
          50: '#F4F6F9',
          100: '#E6EBF2',
          200: '#C7D3E3',
          300: '#9FB3D0',
          400: '#6C8AB7',
          500: '#436599',
          600: '#2E4C7A',
          700: '#1E3558',
          800: '#0F203B',
          900: '#0A1426',
          950: '#050A14',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Manrope', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Cascadia Mono', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.18em',
      },
      boxShadow: {
        'subtle-light': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'subtle-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'card-lift': '0 12px 28px -6px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.08)',
        'card-lift-dark': '0 16px 36px -8px rgba(0, 0, 0, 0.6), 0 0 1px rgba(217, 45, 45, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee-slow': 'marquee 36s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
