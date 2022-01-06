import axios from 'axios'
import _isEmpty from 'lodash/isEmpty'

import { getAccessToken, removeAccessToken } from './utils'

const api = axios.create({
  baseURL: 'https://api.swetrix.com/'
})

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data.statusCode === 401) {
      // removeAccessToken()
    }
    return Promise.reject(error)
  }
)

export const authMe = () =>
  api
    .get('/auth/me')
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const login = (credentials) =>
  api
    .post('/auth/login', credentials)
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })
