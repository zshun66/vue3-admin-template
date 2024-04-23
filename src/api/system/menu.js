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

// 添加菜单
export const reqAddMenu = (data) => {
	return request({
		url: '/system/menu/add',
		method: 'post',
		data: data
	})
}

// 修改菜单
export const reqUpdateMenu = (data) => {
	return request({
		url: '/system/menu/update',
		method: 'post',
		data: data
	})
}

// 删除菜单(可批量)
export const reqDeleteMenu = (ids) => {
	return request({
		url: '/system/menu/delete',
		method: 'delete',
		params: { ids: ids }
	})
}