import { FC } from 'react'
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom'

import Login from './components/Login/Login'
import PasswordHealth from './components/PasswordHealth/PasswordHealth'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import {Routes} from './constants/common'
import { UserContextProvider } from './components/UserContext'

import './style/styles.scss'

const App: FC = () => (
  <Router>
    <Switch>
      <PublicRoute
        path={Routes.Login}
        component={Login}
        defaultRedirect={Routes.PasswordHealth}
      />
      <PrivateRoute
        path={Routes.PasswordHealth}
        component={() => <UserContextProvider><PasswordHealth /></UserContextProvider>}
      />
      <PrivateRoute
        path={Routes.Root}
        component={() => <Redirect to={Routes.PasswordHealth}/>}
      />
    </Switch>
  </Router>
)

export default App
