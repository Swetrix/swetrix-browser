import { call, put } from 'redux-saga/effects'
import _isObject from 'lodash/isPlainObject'

import { authActions } from '../../../actions/auth'
import { errorsActions } from '../../../actions/errors'
import UIActions from '../../../actions/ui'
import { setAccessToken } from '../../../../utils'
import { login } from '../../../../api'

export default function* singinWorker({ payload: { credentials, callback } }) {
  try {
    const { access_token, user } = yield call(login, credentials) // eslint-disable-line

    yield put(authActions.loginSuccess(user))
    yield call(setAccessToken, access_token)
    yield put(UIActions.loadProjects())
    callback(true)
  } catch (error) {
    const err = _isObject(error) ? error.message : error
    yield put(errorsActions.loginFailed(err))
    callback(false)
  } finally {
    yield put(authActions.finishLoading())
  }
}
