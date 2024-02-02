import request from '@/utils/request.js'

// 获取岗位列表(全部)
export const reqPostListAll = () => {
	return request({
		url: '/system/post/list/all',
		method: 'get',
	})
}

// 获取岗位列表(分页)
export const reqPostListPage = (params) => {
	return request({
		url: '/system/post/list/page',
		method: 'get',
		params: params
	})
}