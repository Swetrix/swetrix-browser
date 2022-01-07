import { takeLatest, all, call } from 'redux-saga/effects'

import { types } from '../../../actions/auth/types'
import signIn from '../workers/signin'
import logout from '../workers/logout'

function* watchLogin() {
  yield takeLatest(types.LOGIN_ASYNC, signIn)
}

function* watchLogout() {
  yield takeLatest(types.LOGOUT, logout)
}

export default function* watchAuth() {
  yield all([
    call(watchLogin), call(watchLogout),
  ])
}
