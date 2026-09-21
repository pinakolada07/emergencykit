/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#06080C',
        surface: {
          50: '#141C2E',
          100: '#101726',
          200: '#0D1320',
          DEFAULT: '#0B101B',
          dark: '#070A10',
        },
        cyan: {
          DEFAULT: '#00F0FF',
          glow: '#00F0FF',
          dim: '#0099AA',
          dark: '#05313D',
        },
        alert: {
          DEFAULT: '#FF3B30',
          glow: '#FF3B30',
          dark: '#3D0E0B',
          border: 'rgba(255, 59, 48, 0.35)',
        },
        safe: {
          DEFAULT: '#00E599',
          glow: '#00E599',
          dark: '#063323',
        },
        warning: {
          DEFAULT: '#F59E0B',
          glow: '#F59E0B',
          dark: '#3D2605',
        },
        intelligence: {
          DEFAULT: '#8B5CF6',
          glow: '#A855F7',
          dark: '#241442',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -4px rgba(0, 240, 255, 0.45)',
        'glow-cyan-sm': '0 0 12px -2px rgba(0, 240, 255, 0.35)',
        'glow-alert': '0 0 30px -4px rgba(255, 59, 48, 0.55)',
        'glow-alert-lg': '0 0 50px -5px rgba(255, 59, 48, 0.7)',
        'glow-safe': '0 0 25px -4px rgba(0, 229, 153, 0.45)',
        'glow-purple': '0 0 25px -4px rgba(139, 92, 246, 0.45)',
        'glass-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'beacon': 'beacon 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'alert-flash': 'alertFlash 1.5s ease-in-out infinite',
      },
      keyframes: {
        beacon: {
          '0%': { transform: 'scale(0.95)', opacity: '0.9' },
          '70%': { transform: 'scale(2.2)', opacity: '0' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        alertFlash: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 12px rgba(255,59,48,0.7))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 4px rgba(255,59,48,0.3))' },
        }
      }
    },
  },
  plugins: [],
};
