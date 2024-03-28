import { AppError } from '@utils/AppError'
import axios, { AxiosInstance } from 'axios'

type SignOut = () => void
type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({ baseURL: 'http://192.168.1.77:3333' }) as APIInstanceProps

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, requestError => {

    if(requestError?.response?.status === 401) {
      if(requestError.response.data?.message === 'Invalid JWT token') {
        signOut()
        return Promise.reject(new AppError('Session expired, please sign in again'))
      }
    }

    if(requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    }
    return Promise.reject(new AppError('Server error, try again later'))
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
