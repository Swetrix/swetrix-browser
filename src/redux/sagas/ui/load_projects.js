import { put, call } from 'redux-saga/effects'
import _map from 'lodash/map'
import _isString from 'lodash/isString'

import {
  getProjects, getOverallStats, getLiveVisitors,
} from '../../../api'
import UIActions from '../../actions/ui'

export default function* loadProjects() {
  try {
    let { results } = yield call(getProjects)
    const pids = _map(results, result => result.id)
    const overall = yield call(getOverallStats, pids)

    results = _map(results, res => ({
      ...res,
      overall: overall[res.id],
    }))
    yield put(UIActions.setProjects(results))

    const liveStats = yield call(getLiveVisitors, pids)
    yield put(UIActions.setLiveStats(liveStats))
  } catch ({ message }) {
    if (_isString(message)) {
      yield put(UIActions.setProjectsError(message))
    }

    console.error(message)
  }
}
