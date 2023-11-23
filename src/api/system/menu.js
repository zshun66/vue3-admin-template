import request from '@/utils/request.js'

const API = {
	// 菜单列表
	MENULIST_URL: '/system/menu/list',
}

// 获取菜单列表
export const reqMenuList = (params) => {
	return request({
		url: API.MENULIST_URL,
		method: 'get',
		params: params
	})
}