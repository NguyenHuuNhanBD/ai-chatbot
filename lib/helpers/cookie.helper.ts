import Cookies from 'js-cookie'

const cookieHelper = {
  setValueIntoKey(key: string, value: string, expires?: number | undefined | Date) {
    Cookies.set(key, value, { expires })
  },
  getValueFromKey(key: string) {
    return Cookies.get(key)
  },
  setAccessToken(token: string) {
    this.setValueIntoKey('token', token)
  },
  setRefreshToken(refreshToken: string) {
    this.setValueIntoKey('refreshToken', refreshToken)
  },
  getAccessToken() {
    const token = this.getValueFromKey('token')
    if (!token) return ''
    return token
  },
  getRefreshToken() {
    const token = this.getValueFromKey('refreshToken')
    if (!token) return ''
    return token
  },
  removeAccessToken() {
    const token = this.getAccessToken()
    if (!token) return null
    Cookies.remove('token')
  },
  removeRefreshToken() {
    const token = this.getRefreshToken()
    if (!token) return null
    Cookies.remove('refreshToken')
  },
  removeLanguage() {
    Cookies.remove('lang')
  },
  getLanguage() {
    return this.getValueFromKey('NEXT_LOCALE')
  }
}

export default cookieHelper
