/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  
  theme: {
    container: {
      center: true,
      screens: {
        'sm': '640px', 
        'md': '768px', 
        'lg': '1024px',
        'xl': '1280px',
      },
    },
    extend: {
      fontFamily: {
        'ibm': ['var(--font-ibm)'],
        'robo': ['var(--font-robo)']
      },
      colors: {
        'sand-l': 'rgb(237, 143, 3, 0.4)', 
        'grn-l': 'rgb(220, 227, 91, 0.4)', 
        'black-russ': '#111827',
        'purp-d': 'rgb(167, 112, 239, 0.4)',
        'sea-d': 'rgb(41, 128, 185, 0.4)',
        'blackhover': 'rgba(0,0,0,0.6)'
      },
      boxShadow : {
        custom: '3px 6px 6px 1px rgba(0,0,0,0.5)',
      }
    }
  },
  plugins: [],
}
