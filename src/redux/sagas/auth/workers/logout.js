import { call } from 'redux-saga/effects'

import { removeAccessToken } from '../../../../utils'

export default function* logoutWorker() {
  try {
    yield call(removeAccessToken)
  } catch (error) {
    console.error('[LOGOUT SAGA]', error)
  }
}
