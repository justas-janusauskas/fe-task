import {useEffect, useState} from 'react'
import getUserItems, {IItem} from '~/services/getUserItems'
import getServerTime from '~/services/getServerTime'

const userItemsProvider = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [errorMessage, setErrorMessage] = useState<String>()
  const [items, setItems] = useState<Array<IItem>>([])
  const [currentTime, setCurrentTime] = useState<Date>()

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      if (isLoading) {
        try {
          const [userItems, serverTime] = await Promise.all([getUserItems(), getServerTime()])
          setItems(userItems)
          setCurrentTime(serverTime)
        } catch (error) {
          setErrorMessage(error.message)
        }
        setIsLoading(false)
      }
    })()
    return () => setIsLoading(false)
  }, [])

  return {
    isLoading,
    errorMessage,
    items,
    serverTime: currentTime,
  }
}

export default userItemsProvider
