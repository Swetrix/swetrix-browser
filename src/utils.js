import browser from 'webextension-polyfill'
import _isEmpty from 'lodash/isEmpty'

const TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

export const getAccessToken = async () => {
  const result = await browser.cookies.get({
    name: TOKEN,
    url: 'https://swetrix.com',
  })

  return result?.value
}

export const setAccessToken = async token => {
  await browser.cookies.set({
    name: TOKEN,
    url: 'https://swetrix.com',
    domain: 'swetrix.com',
    secure: true,
    value: token,
    expirationDate: 2147483647,
  })
}

export const removeAccessToken = async () => {
  await browser.cookies.remove({
    name: TOKEN,
    url: 'https://swetrix.com',
  })
}

// 14 weeks in seconds
const STORE_REFRESH_TOKEN_FOR = 8467200

export const getRefreshToken = async () => {
  await browser.cookies.get({
    name: REFRESH_TOKEN,
    url: 'https://swetrix.com',
  })

  return result?.value
}

export const setRefreshToken = async (token) => {
  await browser.cookies.set({
    name: REFRESH_TOKEN,
    url: 'https://swetrix.com',
    domain: 'swetrix.com',
    secure: true,
    value: token,
    expirationDate: Date.now() + STORE_REFRESH_TOKEN_FOR,
  })
}

export const removeRefreshToken = async () => {
  await browser.cookies.remove({
    name: REFRESH_TOKEN,
    url: 'https://swetrix.com',
  })
}