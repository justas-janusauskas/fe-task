import { API } from '~/constants/common'
import getUrl from '../utils/getUrl'

const logout = async (): Promise<any> => {
  const url = getUrl(API.Logout)

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
  if (response.status === 200) {
    localStorage.removeItem('token')
  }

  return {
    status: response.status,
  }
}

export default logout
