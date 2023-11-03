import {
  getStorage,
  setStorage,
  removeStorage
} from './storage.js'

const TOKEN_KEY = 'ZS_ADMIN_TOKEN'

export function getToken() {
  return getStorage(TOKEN_KEY)
}

export function setToken(token) {
  setStorage(TOKEN_KEY, token)
}

export function removeToken() {
  removeStorage(TOKEN_KEY)
}