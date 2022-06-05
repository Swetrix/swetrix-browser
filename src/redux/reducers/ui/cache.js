import { types } from '../../actions/ui/types'
import { getProjectCacheKey } from '../../constants'

const initialState = {
  // { pid: { 'period + timeBucket': { ... }, ... }, ... }
  // example: { 'FSMaC9V4HFLA': { '4wday': { }, '7dhour': { } } }
  analytics: {},

  // { pid: { period: '7d', timeBucket: 'day' }, ... }
  projectViewPrefs: {},
}

const cacheReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_PROJECT_CACHE: {
      const { pid, period, timeBucket, data } = payload
      const key = getProjectCacheKey(period, timeBucket)

      return {
        ...state,
        analytics: {
          ...state.analytics,
          [pid]: {
            ...state.analytics[pid],
            [key]: data,
          },
        },
      }
    }

    case types.SET_PROJECT_VIEW_PREFS: {
      const {
        pid, period, timeBucket, rangeDate,
      } = payload

      return {
        ...state,
        projectViewPrefs: {
          ...state.projectViewPrefs,
          [pid]: rangeDate ? {
            period, timeBucket, rangeDate,
          } : {
            period, timeBucket,
          },
        },
      }
    }

    default:
      return state
  }
}

export default cacheReducer
