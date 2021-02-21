import {IItem} from "~/services/getUserItems"

import { PASSWORD_EXPIRE_TIME } from './constants'

const itemHasOldPassword = (item: IItem, serverTime: Date): boolean => {
  if (!serverTime) return

  const expirationDate = new Date(serverTime).getTime() - PASSWORD_EXPIRE_TIME
  return item.createdAt < new Date(expirationDate).toISOString()
}

export default itemHasOldPassword
