import { FC } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

import {Routes} from '~/constants/common'

interface IPublicRouteProps extends RouteProps {
  defaultRedirect?: string,
}

const PublicRoute: FC<IPublicRouteProps> = ({
 path,
 component,
 defaultRedirect = Routes.PasswordHealth
}) => {
  const token = localStorage.getItem('token')

  if (token) {
    return <Redirect to={defaultRedirect} />
  }

  return <Route path={path} component={component}/>
}

export default PublicRoute
