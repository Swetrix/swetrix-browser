import axios from 'axios'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { getAccessToken, removeAccessToken, setAccessToken, getRefreshToken, removeRefreshToken } from './utils'

const baseURL = 'http://localhost:5005/'

const api = axios.create({
  baseURL,
})

const refreshAuthLogic = async (failedRequest) =>
  axios
    .post(`${baseURL}v1/auth/refresh-token`, null, {
      headers: {
        Authorization: `Bearer ${await getRefreshToken()}`,
      },
    })
    .then((tokenRefreshResponse) => {
      const { accessToken } = tokenRefreshResponse.data
      setAccessToken(accessToken)
      // eslint-disable-next-line
      failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`
      return Promise.resolve()
    })
    .catch((error) => {
      removeAccessToken()
      removeRefreshToken()
      store.dispatch(authActions.logout())
      return Promise.reject(error)
    })

// Instantiate the interceptor
createAuthRefreshInterceptor(api, refreshAuthLogic)

api.interceptors.request.use(
  async (config) => {
    let token

    try {
      token = await getAccessToken()
    } catch (error) {
      console.error('[API REQUEST INTERCEPTOR]', error)
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.data.statusCode === 401) {
      try {
        await removeAccessToken()
      } catch (error) {
        console.error('[API RESPONSE INTERCEPTOR]', error)
      }
    }

    throw error
  },
)

export const authMe = () =>
  api
    .get('/user/me')
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const login = (credentials) =>
  api
    .post('v1/auth/login', credentials)
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })
/* eslint max-params: ["error", 6] */
export const getProjectData = (
  pid,
  tb = 'hour',
  period = '3d',
  filters = [],
  from = '',
  to = '',
) =>
  api
    .get(
      `log?pid=${pid}&timeBucket=${tb}&period=${period}&filters=${JSON.stringify(filters)}&from=${from}&to=${to}`,
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error('[API RESPONSE CATCH][getProjectData]', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getProjects = () =>
  api
    .get('/project')
    .then((response) => response.data)
    .catch((error) => {
      console.error('[API RESPONSE CATCH][getProjects]', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getOverallStats = (pids) =>
  api
    .get(`log/birdseye?pids=[${_map(pids, (pid) => `"${pid}"`).join(',')}]`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('[API RESPONSE CATCH][getOverallStats]', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const getLiveVisitors = (pids) =>
  api
    .get(`log/hb?pids=[${_map(pids, (pid) => `"${pid}"`).join(',')}]`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('[API RESPONSE CATCH][getLiveVisitors]', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

export const refreshToken = () =>
  api
    .post('v1/auth/refresh-token')
    .then((response) => response.data)
    .catch((error) => {
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })
