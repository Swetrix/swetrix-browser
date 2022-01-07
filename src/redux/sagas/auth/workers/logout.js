import { call } from 'redux-saga/effects'

import { removeAccessToken } from '../../../../utils'

export default function* logoutWorker() {
  try {
    yield call(removeAccessToken)
  } catch (e) {
    console.error('[LOGOUT SAGA]', e)
  }
}
