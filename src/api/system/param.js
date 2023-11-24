import request from '@/utils/request.js'

const API = {
	// 参数列表
	PARAMLIST_URL: '/system/param/list',
}

// 获取岗位列表
export const reqParamList = (params) => {
	return request({
		url: API.PARAMLIST_URL,
		method: 'get',
		params: params
	})
}