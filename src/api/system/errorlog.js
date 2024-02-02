import request from '@/utils/request.js'

// 获取错误日志列表(分页)
export const reqErrorLogListPage = (params) => {
	return request({
		url: '/system/errorlog/list/page',
		method: 'get',
		params: params
	})
}