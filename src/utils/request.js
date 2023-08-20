import axios from 'axios'
import { getStorage, getSession, setSession } from '@/utils/storage.js'

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
})

// 请求拦截器
request.interceptors.request.use((config) => {
	// 是否防止重复提交
	let isRepeatSubmit = config.headers.isRepeatSubmit
	isRepeatSubmit = isRepeatSubmit === undefined ? true : isRepeatSubmit

	config.headers['Authorization'] = 'Bearer ' + getStorage('Admin_Token')

	// post、put请求防重复提交
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
				const message = '数据正在处理，请勿重复提交'
				return Promise.reject(new Error(message))
			} else {
				setSession('SESSION_OBJ', requestObj)
			}
		}
	}
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

	if (code !== 200) {
		if (isAlertMsg) {
			ElMessage({
				type: 'error',
				message: response.data.data.message,
				grouping: true
			})
			return false
		}
		return Promise.reject(response.data.data.message)
	} else {
		return response.data
	}
}, (error) => {
	console.warn('响应拦截器发生错误：')
	console.dir(error)
	let errorMsg = ''
	let status = error?.response?.status
	if (status) {
		if (Object.hasOwn(errorStatusCode, status)) {
			errorMsg = errorStatusCode[status]
		}
	} else {
		errorMsg = error.message
	}
	ElMessage({
		type: 'error',
		message: errorMsg,
		grouping: true
	})
	return Promise.reject(error)
})

export default request