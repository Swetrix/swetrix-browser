module.exports = {
  purge: ['./src/**/*.{html,js}'],
  content: [],
  theme: {
    extend: {
      width: {
        'card-toggle': 'calc(100% - 2rem)',
      },
    },
    minHeight: {
      72: '14rem',
    },
  },
  plugins: [],
}
