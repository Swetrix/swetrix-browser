// import browser from 'webextension-polyfill'

import optionsStorage from './login-storage.js'

optionsStorage.syncForm('#login-form')

const form = document.querySelector('#login-form')

function onSubmit() {
  // TODO: Implement login logic 
}

form.addEventListener('submit', onSubmit)
