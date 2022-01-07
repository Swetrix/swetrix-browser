import { put } from 'redux-saga/effects'

import UIActions from '../../actions/ui'

export default function* logout() {
  yield put(UIActions.setProjects([]))
  yield put(UIActions.deleteProjectCache())
}
