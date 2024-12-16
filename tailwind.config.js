/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'fly-up': 'flyUp 1s ease-out',
      },
      keyframes: {
        flyUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50px)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}

