import request from '@/utils/request.js'

const API = {
	// 操作日志列表
	OPERATELOGLIST_URL: '/system/operatelog/list',
}

// 获取操作日志列表
export const reqOperateLogList = (params) => {
	return request({
		url: API.OPERATELOGLIST_URL,
		method: 'get',
		params: params
	})
}