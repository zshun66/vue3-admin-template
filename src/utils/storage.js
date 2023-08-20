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
  localStorage.setItem(key, JSON.stringify(value))
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
  sessionStorage.setItem(key, JSON.stringify(value))
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
