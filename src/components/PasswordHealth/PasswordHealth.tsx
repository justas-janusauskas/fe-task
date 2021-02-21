import { FC, useEffect, useState } from 'react'
import { Route, Redirect, Switch } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { useUserContext } from '../UserContext'
import useItemsProvider from './useItemsProvider'

import {Routes} from '~/constants/common'

import List from './components/List/List'
import FilterTab from './components/FilterTab/FilterTab'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Header from './components/Header/Header'
import ErrorBlock from '../ErrorBlock'

import itemHasWeakPassword from "~/utils/itemHasWeakPassword"
import itemHasReusedPassword from "~/utils/itemHasReusedPassword"
import itemHasOldPassword from '~/utils/itemHasOldPassword'

import { IItem } from "~/services/getUserItems"

import styles from './PasswordHealth.scss'

const PasswordHealth:FC = () => {
  const dispatch = useDispatch()

  const allItems = useSelector(state => state.allItems) || []
  const [itemsWithWeakPassword, setItemsWithWeakPassword] = useState<Array<IItem>>([])
  const [itemsWithReusedPassword, setItemsWithReusedPassword] = useState<Array<IItem>>([])
  const [itemsWithOldPassword, setItemsWithOldPassword] = useState<Array<IItem>>([])
  const [countVulnerableItems, setCountVulnerableItems] = useState<number>(0)

  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext()

  const {
    items,
    isLoading,
    errorMessage,
    serverTime,
  } = useItemsProvider()

  useEffect(() => {
    dispatch({type: 'set', allItems: items})
  }, [items])

  useEffect(() => {
    const withWeakPassword = allItems.filter(itemHasWeakPassword)
    const withReusedPassword = allItems.filter((item) => itemHasReusedPassword(item, allItems))
    const withOldPassword = allItems.filter((item) => itemHasOldPassword(item, serverTime))

    const vulnerableItems = [
      ...withWeakPassword,
      ...withReusedPassword,
      ...withOldPassword,
    ].filter((value, index, self) => {
      return self.indexOf(value) === index
    })

    setItemsWithWeakPassword(withWeakPassword)
    setItemsWithReusedPassword(withReusedPassword)
    setItemsWithOldPassword(withOldPassword)
    setCountVulnerableItems(vulnerableItems.length)
  }, [allItems, serverTime])

  if (userProviderErrorMessage) {
    localStorage.removeItem('token')
    return <Redirect to={Routes.Login} />
  }

  if (errorMessage) {
    return <ErrorBlock error={errorMessage}/>
  }

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen/>
  }

  return (
    <div className="container">
      <Header vulnerableItemCount={countVulnerableItems} username={username} />
      <div className={styles.filter}>
        <FilterTab title="All Passwords" count={allItems.length} path={Routes.PasswordHealth} noBorder />
        <FilterTab title="Weak" count={itemsWithWeakPassword.length} path={Routes.Weak} />
        <FilterTab title="Reused" count={itemsWithReusedPassword.length} path={Routes.Reused} />
        <FilterTab title="Old" count={itemsWithOldPassword.length} path={Routes.Old} />
      </div>
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={allItems} />
        </Route>
        <Route path={Routes.Weak}>
          <List items={itemsWithWeakPassword} />
        </Route>
        <Route path={Routes.Reused}>
          <List items={itemsWithReusedPassword} />
        </Route>
        <Route path={Routes.Old}>
          <List items={itemsWithOldPassword} />
        </Route>
      </Switch>
    </div>
  )
}

export default PasswordHealth
