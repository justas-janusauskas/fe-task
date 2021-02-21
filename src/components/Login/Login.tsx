import { FC, SyntheticEvent, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import LoadingScreen from '~/components/LoadingScreen/LoadingScreen'
import ErrorBlock from '~/components/ErrorBlock'

import { Routes } from '~/constants/common'

import login from '~/services/login'

import styles from './Login.scss'

const Login: FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    setErrorMessage('')
  }, [username, password])

  const handleLogin = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

      await login(username, password).then((response) => {
        setIsLoading(false)
        if (response.status !== 200) {
          setErrorMessage(response.error)
          return
        }
        setLoggedIn(true)
      }).catch((response) => {
        setIsLoading(false)
        console.log(response)
      })
  }

  return loggedIn ? <Redirect to={Routes.PasswordHealth} /> : (
    <>
      <div className={styles.loginPage}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h1 className="text-center">
            Password Health
          </h1>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            type="text"
            className="input mt-52px"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            className="input mt-24px"
          />
          <ErrorBlock error={errorMessage}/>
          <button type="submit" className="button mt-24px">
            Login
          </button>
        </form>
      </div>
      {isLoading && <LoadingScreen/>}
    </>
  )
}

export default Login
