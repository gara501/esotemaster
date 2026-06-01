/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mystic: {
          dark: '#050506',
          night: '#0b0908',
          void: '#11100d',
          card: 'rgba(18, 15, 12, 0.72)',
          parchment: '#d8c7a3',
          bone: '#f3e7c8',
          copper: {
            DEFAULT: '#a85f2f',
            light: '#d18a4e',
            dark: '#5f321e',
          },
          gold: {
            DEFAULT: '#b88a2c',
            light: '#e1c16e',
            dark: '#6f5219',
          },
          incense: {
            DEFAULT: '#6f8f64',
            light: '#a4c28b',
            dark: '#344b34',
          },
          astral: '#7f8fb8',
          purple: {
            DEFAULT: '#6d4a83',
            light: '#b092c2',
            dark: '#2b1834',
          },
          cyan: '#8eb8ad',
          border: 'rgba(216,199,163,0.16)',
        },
      },
      fontFamily: {
        heading: ['Cinzel Decorative', 'Cormorant Garamond', 'serif'],
        body: ['Cormorant Garamond', 'Georgia', 'serif'],
        ui: ['Alegreya Sans', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 38px rgba(184,138,44,0.24)',
        'gold-glow': '0 0 30px rgba(225,193,110,0.24)',
        'copper-glow': '0 0 28px rgba(168,95,47,0.20)',
        'incense-glow': '0 0 26px rgba(111,143,100,0.18)',
        'inner-rite': 'inset 0 1px 0 rgba(243,231,200,0.10), inset 0 -1px 0 rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        'mystic-radial':
          'radial-gradient(circle at 16% 12%, rgba(184,138,44,0.18), transparent 26%), radial-gradient(circle at 82% 18%, rgba(111,143,100,0.12), transparent 24%), radial-gradient(circle at 54% 92%, rgba(168,95,47,0.13), transparent 34%), linear-gradient(145deg, #050506 0%, #0b0908 44%, #11100d 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-110%)' },
          '100%': { transform: 'translateX(110%)' },
        },
        ember: {
          '0%, 100%': { opacity: '0.45', transform: 'translateY(0)' },
          '50%': { opacity: '0.9', transform: 'translateY(-2px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.8s linear infinite',
        ember: 'ember 4.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
