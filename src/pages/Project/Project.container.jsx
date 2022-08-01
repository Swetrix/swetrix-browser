import { connect } from 'react-redux'
import UIActions from '../../redux/actions/ui'
import Project from './Project'

const mapStateToProps = (state) => ({
  projects: state.ui.projects.projects,
  isLoading: state.ui.projects.isLoading,
  cache: state.ui.cache.analytics,
  projectViewPrefs: state.ui.cache.projectViewPrefs,
})

const mapDispatchToProps = (dispatch) => ({
  setProjectCache: (pid, period, timeBucket, data) => {
    dispatch(UIActions.setProjectCache(pid, period, timeBucket, data))
  },
  setProjectViewPrefs: (pid, period, timeBucket) => {
    dispatch(UIActions.setProjectViewPrefs(pid, period, timeBucket))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Project)
