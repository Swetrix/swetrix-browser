import { put, call } from 'redux-saga/effects'

import { getAccessToken } from '../../../utils'
import UIActions from '../../actions/ui'

export default function* initialise() {
  try {
    const token = yield call(getAccessToken)

    if (token) {
      yield put(UIActions.loadProjects())
    }
  } catch (e) {
    console.error(e)
  }
}
