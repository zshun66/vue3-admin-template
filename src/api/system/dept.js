import request from '@/utils/request.js'

const API = {
	MENULIST_URL: '/menu/list',
}

// 获取部门列表
export const reqDeptList = (params) => {
	return request({
		url: API.MENULIST_URL,
		method: 'get',
		params: params
	})
}