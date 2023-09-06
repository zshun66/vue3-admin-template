import request from '@/utils/request.js'

const API = {
	MENULIST_URL: '/menu/list',
}

// 获取菜单列表
export const reqMenuList = (params) => {
	return request({
		url: API.MENULIST_URL,
		method: 'get',
		params: params
	})
}