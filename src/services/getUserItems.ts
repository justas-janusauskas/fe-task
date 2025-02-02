import {API} from "~/constants/common"
import getUrl from "~/utils/getUrl"

export interface IItem {
  id: string,
  title: string,
  description: string,
  password: string,
  createdAt: string,
}

const getUserItems = async (userId?: string): Promise<Array<IItem>> => {
  const url = getUrl(API.Items, {
    userId,
  })

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })

  const data = await response.json()

  return data.items
}

export default getUserItems
