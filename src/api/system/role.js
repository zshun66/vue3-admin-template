import request from '@/utils/request.js'

const API = {
	ROLELIST_URL: '/role/list',
}

// 获取菜单列表
export const reqRoleList = (params) => {
	return request({
		url: API.ROLELIST_URL,
		method: 'get',
		params: params
	})
}