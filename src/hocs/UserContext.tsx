import { FC, createContext, useContext, useEffect, useState } from 'react'

import { API } from '~/constants/common'

import getUrl from '~/utils/getUrl'

interface IUser {
  updateUser: () => void,
  deleteData: () => void,
  errorMessage: string,
  isLoading: boolean,
  username: string,
  email: string,
  id: string
}

const UserContext = createContext<IUser>({
  updateUser: () => {},
  deleteData: () => {},
  errorMessage: null,
  isLoading: true,
  username: null,
  email: null,
  id: null,
})

export const useUserContext = () => useContext(UserContext)

export const UserContextProvider: FC = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [username, setUsername] = useState<string>(null)
  const [email, setEmail] = useState<string>(null)
  const [id, setId] = useState<string>(null)

  const updateUser = async () => {
    setErrorMessage(null)
    setIsLoading(true)

    if (isLoading) {
      try {
        const response = await fetch(getUrl(API.User), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        })
        const data = await response.json()

        setUsername(data?.username)
        setEmail(data?.email)
        setId(data?.id)
      } catch (error) {
        setErrorMessage(error.message)
      }
      setIsLoading(false)
    }
  }

  const deleteData = () => {
    setErrorMessage(null)
    setIsLoading(false)
    setUsername(null)
    setEmail(null)
    setId(null)
  }

  useEffect(() => {
   updateUser()
   return () => setIsLoading(false)
  }, [])

  const value = {
    updateUser,
    deleteData,
    errorMessage,
    isLoading,
    username,
    email,
    id,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
