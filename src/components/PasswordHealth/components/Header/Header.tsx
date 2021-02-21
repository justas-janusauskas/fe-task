import { FC, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Routes } from '~/constants/common'

import logout from '~/services/logout'

import styles from './Header.scss'

interface IHeader {
  vulnerableItemCount: number
  username: string
}

const Header: FC<IHeader> = ({vulnerableItemCount, username}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true)

  const handleLogout = async () => {
    await logout().then((response) => {
      if (response.status === 200) {
        setLoggedIn(false)
      }
    }).catch((response) => {
      console.log(response)
    })
  }

  const headerClass = vulnerableItemCount > 0 ? styles.header : `${styles.header} ${styles.header_noVulnerables}`

  return loggedIn ? (
    <div className={headerClass}>
      <div className={styles.userSection}>
        <button onClick={handleLogout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${vulnerableItemCount} Items are vulnerable`}</h1>
      <span>Create new complex passwords to protect your accounts</span>
    </div>
  ) : <Redirect to={Routes.Login} />
}

export default Header
