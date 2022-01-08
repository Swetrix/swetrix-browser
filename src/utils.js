import browser from 'webextension-polyfill'

const TOKEN = 'token'

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
