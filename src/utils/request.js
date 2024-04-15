import axios from 'axios'
import useUserStore from '@/pinia/modules/user.js'
import { getSession, setSession } from '@/utils/storage.js'

const errorStatusCode = {
	'401': 'Token过期，请重新登录',
	'403': '无权限访问',
	'404': '请求地址错误',
	'500': '服务错误'
}

// 创建axios实例
let request = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 10000,
	headers: {}
})


// 请求拦截器
request.interceptors.request.use((config) => {
	addTokenByIsAuth(config)
	const error = preventRepeatSubmit(config)
	if (error) return Promise.reject(new Error(error))
	return config
}, (error) => {
	console.warn('请求拦截器捕获错误：')
	console.dir(error)
	return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response) => {
	// 接口请求异常时是否弹出错误信息
	let isAlertMsg = response.config.headers.isAlertMsg
	isAlertMsg = isAlertMsg === undefined ? true : isAlertMsg

	let code = response.data.code
	let message = response.data.message

	if (code === 200) {
		return { result: response.data, error: null }
	} else {
		if (isAlertMsg) {
			ElMessage({ type: 'error', message: message, grouping: true })
		}
		if (code === 401) {
			// TODO 过期重新登录
		}
		return { result: null, error: message }
	}
}, (error) => {
	console.warn('响应拦截器捕获错误：')
	console.dir(error)
	let message = ''
	let status = error?.response?.status
	if (status && Object.hasOwn(errorStatusCode, status)) {
		message = errorStatusCode[status]
	} else {
		message = error.message
	}
	ElMessage({ type: 'error', message: message, grouping: true })
	return Promise.resolve({ result: null, error: error })
})

export default request





/**
 * 请求前根据需要在请求头设置token
 * @param { Object } config 请求拦截器中的config对象
 */
const addTokenByIsAuth = function (config) {
  const userStore = useUserStore()
  // 此次请求是否需要token
  let isAuth = config.headers.isAuth
  isAuth = isAuth === undefined ? true : isAuth
  if (isAuth) config.headers['Authorization'] = 'Bearer ' + userStore.token
}

/**
 * post、put请求防重复提交
 * @param { Object } config 请求拦截器中的config对象
 */
const preventRepeatSubmit = function (config) {
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