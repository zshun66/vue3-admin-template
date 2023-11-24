import request from '@/utils/request.js'

const API = {
	// 登录日志列表
	LOGINLOGLIST_URL: '/system/loginlog/list',
}

// 获取登录日志列表
export const reqLoginLogList = (params) => {
	return request({
		url: API.LOGINLOGLIST_URL,
		method: 'get',
		params: params
	})
}