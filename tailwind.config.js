module.exports = {
  purge: ['./src/**/*.{html,js}'],
  content: [],
  theme: {
    extend: {},
    minHeight: {
     '72': '18rem',
     'page': 'calc(100vh - 74px)', // header height -> 74px
     'min-footer': 'calc(100vh - 162px)', // 74px + 88px footer height
     'min-footer-ad': 'calc(100vh - 265px)', // 74px + 88px footer height
    },
  },
  plugins: [],
}
