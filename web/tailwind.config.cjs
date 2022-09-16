/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      backgroundImage:{
        galaxy: "url('/bgGalaxy.png')",
        'nlw-gradient':' linear-gradient(89.86deg, #8e57ba 20%, #8F90D7 40%, #60EDA9 60%, #CDA05C 80%)',    
        'game-gradient':' linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 67.88%)',
        'bg-gradient-to-r': 'linear-gradient(to right, var(nlw-gradient));' 
      }
    },
    screens: {
        'sm': {'max': '640px'},

        'md': {'max': '1024px'},

        'lg': {'min': '1280px'},

    },
    keyframes: {
        waving: {
            '0%, 100%': { transform: 'rotate(0deg)' },
            '25%': { transform: 'rotate(1deg)' },
            '75%': { transform: 'rotate(-1deg)' },
        }
      },
      animation: {
        wave: 'waving 10s infinite linear',
      }
  },
  plugins: [],
}
