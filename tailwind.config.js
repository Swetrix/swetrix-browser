module.exports = {
  mode: 'jit',
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx,html}'],
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
