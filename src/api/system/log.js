import request from '@/utils/request.js'

// 获取登录日志列表(分页)
export const reqLoginLogListPage = (params) => {
	return request({
		url: '/system/loginlog/list/page',
		method: 'get',
		params: params
	})
}

// 获取操作日志列表(分页)
export const reqOperLogListPage = (params) => {
	return request({
		url: '/system/operlog/list/page',
		method: 'get',
		params: params
	})
}

// 获取错误日志列表(分页)
export const reqErrorLogListPage = (params) => {
	return request({
		url: '/system/errorlog/list/page',
		method: 'get',
		params: params
	})
}