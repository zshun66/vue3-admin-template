import request from '@/utils/request.js'

// 获取菜单列表(全部)
export const reqMenuListAll = () => {
	return request({
		url: '/system/menu/list/all',
		method: 'get',
	})
}

// 获取菜单列表(分页)
export const reqMenuListPage = (params) => {
	return request({
		url: '/system/menu/list/page',
		method: 'get',
		params: params
	})
}