import axios from 'axios'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { getAccessToken, setAccessToken, getRefreshToken } from './utils'

const baseURL = 'https://api.swetrix.com'

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
      store.dispatch(authActions.logout())
      return Promise.reject(error)
    })

// Instantiate the interceptor
createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [401, 403],
})

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

export const logoutApi = (refreshToken) =>
  axios
    .post(`${baseURL}v1/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      debug('%s', error)
      throw _isEmpty(error.response.data?.message)
        ? error.response.data
        : error.response.data.message
    })

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
