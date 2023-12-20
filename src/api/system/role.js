import request from '@/utils/request.js'

const API = {
	// 角色列表
	ROLELIST_URL: 'https://www.fastmock.site/mock/3ae7841ac891478dce1568a9b20de8e4/zve-admin/system/role/list',
}

// 获取角色列表
export const reqRoleList = (params) => {
	return request({
		url: API.ROLELIST_URL,
		method: 'get',
		params: params
	})
}