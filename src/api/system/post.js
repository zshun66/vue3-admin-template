import request from '@/utils/request.js'

const API = {
	POSTLIST_URL: '/post/list',
}

// 获取岗位列表
export const reqPostList = (params) => {
	return request({
		url: API.POSTLIST_URL,
		method: 'get',
		params: params
	})
}