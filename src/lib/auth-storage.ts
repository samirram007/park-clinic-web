const TOKEN_KEY = 'auth_token'

export const getStorage = (): Storage => {
  const storageType = import.meta.env.VITE_AUTH_STORAGE_TYPE
  return storageType === 'session' ? sessionStorage : localStorage
}

export const setToken = (token: string) => {
  getStorage().setItem(TOKEN_KEY, token)
}

export const getToken = () => {
  return getStorage().getItem(TOKEN_KEY)
}

export const removeToken = () => {
  getStorage().removeItem(TOKEN_KEY)
}
