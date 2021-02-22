import { FC } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

import { Routes } from '../constants/common'

const PrivateRoute: FC<RouteProps> = ({
  path,
  component,
}) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Redirect to={Routes.Login} />
  }

  return <Route path={path} component={component}/>
}

export default PrivateRoute
