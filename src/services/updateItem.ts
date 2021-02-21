import { API } from '~/constants/common'
import getUrl from '~/utils/getUrl'
import { IItem } from './getUserItems'

const updateItem = async (item: IItem): Promise<IItem> => {
    const url = getUrl(API.Items)
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
  
    const data = await response.json()
    return {
        status: response.status,
        ...data,
    }
  }

export default updateItem
