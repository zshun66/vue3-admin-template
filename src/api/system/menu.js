import request from '@/utils/request.js'

const API = {
	// 菜单列表
	MENULIST_URL: 'https://www.fastmock.site/mock/3ae7841ac891478dce1568a9b20de8e4/zve-admin/system/menu/list',
}

// 获取菜单列表
export const reqMenuList = (params) => {
	return request({
		url: API.MENULIST_URL,
		method: 'get',
		params: params
	})
}