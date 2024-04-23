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

// 添加角色
export const reqAddRole = (data) => {
	return request({
		url: '/system/role/add',
		method: 'post',
		data: data
	})
}

// 修改角色
export const reqUpdateRole = (data) => {
	return request({
		url: '/system/role/update',
		method: 'post',
		data: data
	})
}

// 删除角色(可批量)
export const reqDeleteRole = (ids) => {
	return request({
		url: '/system/role/delete',
		method: 'delete',
		params: { ids: ids }
	})
}