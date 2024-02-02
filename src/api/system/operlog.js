import request from '@/utils/request.js'

// 获取操作日志列表(分页)
export const reqOperLogListPage = (params) => {
	return request({
		url: '/system/operlog/list/page',
		method: 'get',
		params: params
	})
}