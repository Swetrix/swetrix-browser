import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Loading from '../components/Loading'
import Header from '../components/Header'
import { authMe } from '../api'
import { getAccessToken } from '../utils'
import { authActions } from '../redux/actions/auth'
import routes from '../routes'
import Login from './Login'
import Dashboard from './Dashboard'
import Project from './Project'

const App = () => {
  const dispatch = useDispatch()
  const { loading, authenticated } = useSelector(state => state.auth)
  const [token, setToken] = useState(null)

  useEffect(() => {
    (async () => {
      let accessToken
      try {
        accessToken = await getAccessToken()
      } catch (error) {
        console.error('[APP.JSX TOKEN RETREIVE]', error)
      }

      if (accessToken && !authenticated) {
        try {
          const me = await authMe()

          dispatch(authActions.loginSuccess(me))
          dispatch(authActions.finishLoading())
          setToken(accessToken)
        } catch {
          dispatch(authActions.logout())
        }
      } else {
        dispatch(authActions.finishLoading())
      }
    })()
  }, [dispatch, authenticated])

  if (token || !loading) {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path={routes.signin} component={Login} />
          <Route exact path={routes.dashboard} component={Dashboard} />
          <Route exact path={routes.project} component={Project} />
          <Redirect to={routes.signin} />
        </Switch>
      </>
    )
  }

  return (
    <>
      <Header />
      <Loading />
    </>
  )
}

export default App
