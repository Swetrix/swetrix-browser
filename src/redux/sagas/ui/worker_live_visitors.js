import { put, call, delay, select } from 'redux-saga/effects'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'

import { getLiveVisitors } from '../../../api'
import UIActions from '../../actions/ui'
import { LIVE_VISITORS_UPDATE_INTERVAL } from '../../constants'

export default function* liveVisitors() {
  while (true) {
    yield delay(LIVE_VISITORS_UPDATE_INTERVAL)
    const projects = yield select(state => state.ui.projects.projects)
    if (_isEmpty(projects)) {
      continue
    }

    const pids = _map(_filter(projects, ({ uiHidden }) => !uiHidden), project => project.id)
    const liveStats = yield call(getLiveVisitors, pids)

    yield put(UIActions.setLiveStats(liveStats))
  }
}
