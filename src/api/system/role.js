import request from '@/utils/request.js'

const API = {
	// 角色列表
	ROLELIST_URL: '/system/role/list',
}

// 获取角色列表
export const reqRoleList = (params) => {
	return request({
		url: API.ROLELIST_URL,
		method: 'get',
		params: params
	})
}