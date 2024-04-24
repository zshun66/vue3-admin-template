import request from '@/utils/request.js'

// 获取参数列表(分页)
export const reqParamListPage = (params) => {
	return request({
		url: '/system/param/list/page',
		method: 'get',
		params: params
	})
}

// 添加参数
export const reqAddParam = (data) => {
	return request({
		url: '/system/param/add',
		method: 'post',
		data: data
	})
}

// 修改参数
export const reqUpdateParam = (data) => {
	return request({
		url: '/system/param/update',
		method: 'post',
		data: data
	})
}

// 删除参数(可批量)
export const reqDeleteParam = (ids) => {
	return request({
		url: '/system/param/delete',
		method: 'delete',
		params: { ids: ids }
	})
}