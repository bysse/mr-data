/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', '.src/**/*.{vue,js}'],
  media: false,
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

