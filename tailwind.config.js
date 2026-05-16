module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background:    '#0F172A',
        surface:       '#1C0A0A',
        accent:        '#EF4444',
        accentLight:   '#F87171',
        highlight:     '#F97316',
        deep:          '#7C0000',
        textPrimary:   '#F8FAFC',
        textSecondary: '#94A3B8',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-red':  'pulseRed 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseRed: {
          '0%, 100%': { opacity: '0.15' },
          '50%':      { opacity: '0.30' },
        },
      },
    },
  },
  plugins: [],
}