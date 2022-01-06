import browser, { windows } from 'webextension-polyfill'

// import optionsStorage from './login-storage.js'
import { login } from '../../api'

// optionsStorage.syncForm('#login-form')

const form = document.querySelector('#login-form')

async function onSubmit (e) {
  e.preventDefault()

  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value
  
  try {
    // const { access_token } = await login({
    //   email, password,
    // })
    // browser.cookies.set({
    //   name: 'token',
    //   url: 'https://swetrix.com',
    //   domain: 'swetrix.com',
    //   secure: true,
    //   value: access_token,
    //   expirationDate: 2147483647,
    // })

    window.location.href = '../dashboard/index.html'
  } catch (e) {
    console.error(e)
  }
}

// const cook = browser.cookies.get({
//   name: 'token',
//   url: 'https://swetrix.com',
// })

// cook.then((cookie) => {
//   console.log(cookie)
// })

form.addEventListener('submit', onSubmit)
