import {API} from "../constants/common"
import getUrl from "../utils/getUrl"

const getServerTime = async (userId?: string): Promise<Date> => {
  const url = getUrl(API.ServerInfo, {})

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })

  const data = await response.json()
  return data.serverTime
}

export default getServerTime

