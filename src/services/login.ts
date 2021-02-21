import { API } from '~/constants/common'
import getUrl from '../utils/getUrl'

const login = async (username: string, password: string): Promise<any> => {
  const url = getUrl(API.Login)

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json()
  const { token } = data
  if (response.status === 200) {
    localStorage.setItem('token', token)
  }

  return {
    status: response.status,
    ...data,
  }
  
}

export default login
