import request from '@/utils/request.js'

const API = {
	// 岗位列表
	POSTLIST_URL: '/system/post/list',
}

// 获取岗位列表
export const reqPostList = (params) => {
	return request({
		url: API.POSTLIST_URL,
		method: 'get',
		params: params
	})
}