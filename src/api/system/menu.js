import request from '@/utils/request.js'

const API = {
	// 菜单列表(全部)
	MENULIST_ALL_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/menu/list/all',
	// 菜单列表(分页)
	MENULIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/menu/list/page',
}

// 获取菜单列表(全部)
export const reqMenuListAll = () => {
	return request({
		url: API.MENULIST_ALL_URL,
		method: 'get',
	})
}

// 获取菜单列表(分页)
export const reqMenuListPage = (params) => {
	return request({
		url: API.MENULIST_PAGE_URL,
		method: 'get',
		params: params
	})
}