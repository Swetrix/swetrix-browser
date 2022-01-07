import { types } from './types'

const loadProjects = () => ({
  type: types.LOAD_PROJECTS,
})

const setProjects = (projects) => ({
  type: types.SET_PROJECTS,
  payload: {
    projects,
  },
})

const setLiveStats = (data) => ({
  type: types.SET_LIVE_STATS,
  payload: {
    data,
  },
})

const setLiveStatsForProject = (id, count) => ({
  type: types.SET_LIVE_STATS_PROJECT,
  payload: {
    id, count,
  },
})

const setProjectsError = (error) => ({
  type: types.SET_PROJECTS_ERROR,
  payload: {
    error,
  },
})

const setProjectsLoading = (isLoading) => ({
  type: types.SET_PROJECTS_LOADING,
  payload: {
    isLoading,
  },
})

const setProjectCache = (pid, period, timeBucket, data) => ({
  type: types.SET_PROJECT_CACHE,
  payload: {
    pid, period, timeBucket, data,
  },
})

const setProjectViewPrefs = (pid, period, timeBucket) => ({
  type: types.SET_PROJECT_VIEW_PREFS,
  payload: {
    pid, period, timeBucket,
  },
})

const UIActions = {
  loadProjects,
  setProjects,
  setProjectsError,
  setProjectsLoading,
  setProjectCache,
  setProjectViewPrefs,
  setLiveStatsForProject,
  setLiveStats,
}

export default UIActions
