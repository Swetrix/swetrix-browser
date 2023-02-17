import { put, call } from 'redux-saga/effects'

import {
  getAccessToken, getRefreshToken,
} from '../../../utils'
import UIActions from '../../actions/ui'

export default function* initialise() {
  try {
    const token = yield call(getAccessToken)
    const refreshToken = yield call(getRefreshToken)

    if (token && refreshToken) {
      yield put(UIActions.loadProjects())
    }
  } catch (error) {
    console.error(error)
  }
}
