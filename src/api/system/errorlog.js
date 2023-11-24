import request from '@/utils/request.js'

const API = {
	// 错误日志列表
	ERRORLOGLIST_URL: '/system/errorlog/list',
}

// 获取错误日志列表
export const reqErrorLogList = (params) => {
	return request({
		url: API.ERRORLOGLIST_URL,
		method: 'get',
		params: params
	})
}