module.exports = {
  mode: 'jit',
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx,html}'],
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
}
