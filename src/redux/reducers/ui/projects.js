import _filter from 'lodash/filter'
import _findIndex from 'lodash/findIndex'
import _map from 'lodash/map'
import { types } from '../../actions/ui/types'

const getInitialState = () => {
  return {
    projects: [],
    isLoading: true,
    error: null,
  }
}

const projectsReducer = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case types.SET_PROJECTS: {
      const { projects } = payload
      return {
        ...state,
        projects,
        isLoading: false,
      }
    }

    case types.SET_LIVE_STATS: {
      const { data } = payload

      return {
        ...state,
        projects: _map(state.projects, res => ({
          ...res,
          live: data[res.id],
        }))
      }
    }

    case types.SET_LIVE_STATS_PROJECT: {
      const { id, count } = payload

      return {
        ...state,
        projects: _map(state.projects, res => {
          if (res.id === id) {
            return {
              ...res,
              live: count,
            }
          } else {
            return res
          }
        })
      }
    }

    case types.SET_PROJECTS_ERROR: {
      const { error } = payload
      return {
        ...state,
        error,
      }
    }

    case types.SET_PROJECTS_LOADING: {
      const { isLoading } = payload
      return {
        ...state,
        isLoading,
      }
    }

    default:
      return state
  }
}

export default projectsReducer
