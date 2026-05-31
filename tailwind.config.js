/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mystic: {
          dark: '#0a0a0f',
          night: '#0d0d1a',
          card: 'rgba(255,255,255,0.03)',
          purple: {
            DEFAULT: '#7c3aed',
            light: '#a78bfa',
            dark: '#4c1d95',
          },
          gold: {
            DEFAULT: '#d97706',
            light: '#fbbf24',
          },
          cyan: '#06b6d4',
          border: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 32px rgba(124,58,237,0.28)',
        'gold-glow': '0 0 26px rgba(217,119,6,0.22)',
        'cyan-glow': '0 0 26px rgba(6,182,212,0.18)',
      },
      backgroundImage: {
        'mystic-radial':
          'radial-gradient(circle at 20% 15%, rgba(124,58,237,0.2), transparent 28%), radial-gradient(circle at 80% 8%, rgba(6,182,212,0.14), transparent 24%), radial-gradient(circle at 50% 100%, rgba(217,119,6,0.1), transparent 34%)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.4s linear infinite',
      },
    },
  },
  plugins: [],
};
