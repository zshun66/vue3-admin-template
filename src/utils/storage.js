import Cookies from 'js-cookie'

/**
 * 获取localStorage值
 */
export const getStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    return localStorage.getItem(key)
  }
}

/**
 * 设置localStorage值
 */
export const setStorage = (key, value) => {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }
}

/**
 * 移除localStorage值
 */
export const removeStorage = (key) => {
  localStorage.removeItem(key)
}

/**
 * 清空localStorage值
 */
export const clearStorage = () => {
  localStorage.clear()
}


// --------------------------------------------------------------------------------------------------------------------------------


/**
 * 获取sessionStorage值
 */
export const getSession = (key) => {
  try {
    return JSON.parse(sessionStorage.getItem(key))
  } catch (error) {
    return sessionStorage.getItem(key)
  }
}

/**
 * 设置sessionStorage值
 */
export const setSession = (key, value) => {
  if (typeof value === 'object') {
    sessionStorage.setItem(key, JSON.stringify(value))
  } else {
    sessionStorage.setItem(key, value)
  }
}

/**
 * 移除sessionStorage值
 */
export const removeSession = (key) => {
  sessionStorage.removeItem(key)
}

/**
 * 清空sessionStorage值
 */
export const clearSession = () => {
  sessionStorage.clear()
}


// --------------------------------------------------------------------------------------------------------------------------------


/**
 * 获取Cookie值
 */
export const getCookie = (key) => {
  try {
    return JSON.parse(Cookies.get(key))
  } catch (error) {
    return Cookies.get(key)
  }
}

/**
 * 设置Cookie值
 */
export const setCookie = (key, value) => {
  if (typeof value === 'object') {
    Cookies.set(key, JSON.stringify(value))
  } else {
    Cookies.set(key, value)
  }
}

/**
 * 移除Cookie值
 */
export const removeCookie = (key) => {
  Cookies.remove(key)
}

/**
 * 清空Cookie值
 */
export const clearCookie = () => {
  Cookies.clear()
}