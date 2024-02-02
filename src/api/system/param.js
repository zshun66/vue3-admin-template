import request from '@/utils/request.js'

// 获取参数列表(分页)
export const reqParamListPage = (params) => {
	return request({
		url: '/system/param/list/page',
		method: 'get',
		params: params
	})
}