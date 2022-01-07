import { connect } from 'react-redux'
import { authActions } from '../../redux/actions/auth'
import Login from './Login'

const mapDispatchToProps = (dispatch) => ({
  login: (data, callback) => {
    dispatch(authActions.loginAsync(data, callback))
  },
})

export default connect(null, mapDispatchToProps)(Login)
