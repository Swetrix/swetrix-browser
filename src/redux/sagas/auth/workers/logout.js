import { call } from 'redux-saga/effects'

import { removeAccessToken, removeRefreshToken } from '../../../../utils'

export default function* logoutWorker() {
  try {
    yield call(removeAccessToken)
    yield call(removeRefreshToken)
  } catch (error) {
    console.error('[LOGOUT SAGA]', error)
  }
}
