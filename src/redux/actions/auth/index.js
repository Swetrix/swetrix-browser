import { types } from './types'
import { getRefreshToken, removeAccessToken, removeRefreshToken } from '../../../utils'
import { logoutApi } from '../../../api'

export const authActions = {
  // Synchronous
  loginSuccess(user) {
    return {
      type: types.LOGIN_SUCCESSFUL,
      payload: { user },
    }
  },

  logout() {
    const refreshToken = getRefreshToken()
    logoutApi(refreshToken)
    removeAccessToken()
    removeRefreshToken()
    return {
      type: types.LOGOUT,
    }
  },

  clearErrors() {
    return {
      type: types.CLEAR_ERRORS,
    }
  },

  finishLoading() {
    return {
      type: types.FINISH_LOADING,
    }
  },

  // Asynchronous
  loginAsync(credentials, callback = () => {}) {
    return {
      type: types.LOGIN_ASYNC,
      payload: {
        credentials, callback,
      },
    }
  },
}
