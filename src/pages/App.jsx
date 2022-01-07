import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './Login'
import Dashboard from './Dashboard'
import Loader from '../ui/Loader'
import { authMe } from '../api'
import { getAccessToken } from '../utils'
import { authActions } from '../redux/actions/auth'
import routes from '../routes'

const App = () => {
  const dispatch = useDispatch()
  const { loading, authenticated } = useSelector(state => state.auth)
  const [token, setToken] = useState(null)
  
  useEffect(() => {
    (async () => {
        try {
          const accessToken = await getAccessToken()
          setToken(accessToken)
        } catch (e) {
          console.error('[APP.JSX TOKEN RETREIVE]', e)
        }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (token && !authenticated) {
        try {
          const me = await authMe()

          dispatch(authActions.loginSuccess(me))
          dispatch(authActions.finishLoading())
        } catch (e) {
          dispatch(authActions.logout())
        }
      } else {
        dispatch(authActions.finishLoading())
      }
    })()
  }, [dispatch, token, authenticated])

  if (token || !loading) {
    return (
      <Switch>
        <Route path={routes.signin} component={Login} exact />
        <Route path={routes.dashboard} component={Dashboard} exact />
        <Redirect to={routes.signin} />
      </Switch>
    )
  }

  return (
    <Loader />
  )
}

export default App