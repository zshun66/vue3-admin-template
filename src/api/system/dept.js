import request from '@/utils/request.js'

const API = {
	// 部门列表
	DEPTLIST_URL: '/system/dept/list',
}

// 获取部门列表
export const reqDeptList = (params) => {
	return request({
		url: API.DEPTLIST_URL,
		method: 'get',
		params: params
	})
}