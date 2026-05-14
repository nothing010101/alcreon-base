/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          blue: '#1652F0',
          light: '#4B7BF5',
          dark: '#0D35B3',
        },
        dark: {
          900: '#05050A',
          800: '#0A0A14',
          700: '#10101E',
          600: '#16162A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(22, 82, 240, 0.3)' },
          '100%': { boxShadow: '0 0 60px rgba(22, 82, 240, 0.8)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(22, 82, 240, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(22, 82, 240, 0.05) 1px, transparent 1px)`,
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(22, 82, 240, 0.25) 0%, transparent 70%)',
        'cta-gradient': 'linear-gradient(135deg, #1652F0 0%, #0D35B3 50%, #05050A 100%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
