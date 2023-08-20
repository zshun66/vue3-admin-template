import Cookies from 'js-cookie'

const TOKEN_KEY = 'Admin_Token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
  Cookies.set(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
  Cookies.remove(TOKEN_KEY)
}