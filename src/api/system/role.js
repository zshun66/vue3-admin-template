import request from '@/utils/request.js'

const API = {
	// 角色列表(全部)
	ROLELIST_ALL_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/role/list/all',
	// 角色列表(分页)
	ROLELIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/role/list/page',
}

// 获取角色列表(全部)
export const reqRoleListAll = () => {
	return request({
		url: API.ROLELIST_ALL_URL,
		method: 'get',
	})
}

// 获取角色列表(分页)
export const reqRoleListPage = (params) => {
	return request({
		url: API.ROLELIST_PAGE_URL,
		method: 'get',
		params: params
	})
}