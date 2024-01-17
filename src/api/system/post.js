import request from '@/utils/request.js'

const API = {
	// 岗位列表(全部)
	POSTLIST_ALL_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/post/list/all',
	// 岗位列表(分页)
	POSTLIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/post/list/page',
}

// 获取岗位列表(全部)
export const reqPostListAll = () => {
	return request({
		url: API.POSTLIST_ALL_URL,
		method: 'get',
	})
}

// 获取岗位列表(分页)
export const reqPostListPage = (params) => {
	return request({
		url: API.POSTLIST_PAGE_URL,
		method: 'get',
		params: params
	})
}