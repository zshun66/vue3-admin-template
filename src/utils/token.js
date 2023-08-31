import {
  getStorage, setStorage, removeStorage,
  getCookie, setCookie, removeCookie
} from './storage.js'

const TOKEN_KEY = 'ADMIN_TOKEN'

export function getToken() {
  return getStorage(TOKEN_KEY) || getCookie(TOKEN_KEY)
}

export function setToken(token) {
  setStorage(TOKEN_KEY, token)
  setCookie(TOKEN_KEY, token)
}

export function removeToken() {
  removeStorage(TOKEN_KEY)
  removeCookie(TOKEN_KEY)
}