import { getToken } from '@/utils/token.js'
import { getSession, setSession } from '@/utils/storage.js'

/**
 * 请求前根据需要在请求头设置token
 * @param { Object } config 请求拦截器中的config对象
 */
export const addTokenByIsAuth = function (config) {
  // 此次请求是否需要token
  let isAuth = config.headers.isAuth
  isAuth = isAuth === undefined ? true : isAuth
  isAuth && (config.headers['Authorization'] = 'Bearer ' + getToken())
}

/**
 * post、put请求防重复提交
 * @param { Object } config 请求拦截器中的config对象
 */
export const preventRepeatSubmit = function (config) {
  // 是否防止重复提交
  let isRepeatSubmit = config.headers.isRepeatSubmit
  isRepeatSubmit = isRepeatSubmit === undefined ? true : isRepeatSubmit

  if (isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const sessionObj = getSession('SESSION_OBJ')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      setSession('SESSION_OBJ', requestObj)
    } else {
      const r_url = sessionObj.url
      const r_data = sessionObj.data
      const r_time = sessionObj.time
      const interval = 1000
      if (requestObj.url === r_url && requestObj.data === r_data && requestObj.time - r_time < interval) {
        return '数据正在处理，请勿重复提交'
      } else {
        setSession('SESSION_OBJ', requestObj)
      }
    }
  }
}