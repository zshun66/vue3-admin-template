import axios from 'axios'
import { addTokenByIsAuth, preventRepeatSubmit } from './requestHelper.js'

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
	console.warn('请求拦截器发生错误：')
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
	console.warn('响应拦截器发生错误：')
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