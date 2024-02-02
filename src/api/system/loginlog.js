import request from '@/utils/request.js'

// 获取登录日志列表(分页)
export const reqLoginLogListPage = (params) => {
	return request({
		url: '/system/loginlog/list/page',
		method: 'get',
		params: params
	})
}