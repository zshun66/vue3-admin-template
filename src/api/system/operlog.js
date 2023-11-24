import request from '@/utils/request.js'

const API = {
	// 操作日志列表
	OPERLOGLIST_URL: '/system/operlog/list',
}

// 获取操作日志列表
export const reqOperLogList = (params) => {
	return request({
		url: API.OPERLOGLIST_URL,
		method: 'get',
		params: params
	})
}