import qs from 'query-string'
import { API } from '../constants/common'

const getUrl = (endpoint: API, params?: Record<string, any>): string => {

  const query = qs.stringify(params)

  return `${process.env.API_URL}/${endpoint}${query ? `?${query}` : ''}`
}

export default getUrl
