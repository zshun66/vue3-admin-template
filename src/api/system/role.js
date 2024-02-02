import request from '@/utils/request.js'

// 获取角色列表(全部)
export const reqRoleListAll = () => {
	return request({
		url: '/system/role/list/all',
		method: 'get',
	})
}

// 获取角色列表(分页)
export const reqRoleListPage = (params) => {
	return request({
		url: '/system/role/list/page',
		method: 'get',
		params: params
	})
}