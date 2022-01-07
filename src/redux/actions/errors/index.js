import { types } from './types'

export const errorsActions = {
  // Authorisation
  loginFailed(error) {
    return {
      type: types.LOGIN_FAILED,
      payload: { error },
    }
  },

  genericError(error) {
    return {
      type: types.GENERIC_ERROR,
      payload: { error },
    }
  },

  clearErrors() {
    return {
      type: types.CLEAR_ERRORS,
    }
  },
}
