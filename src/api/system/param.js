import request from '@/utils/request.js'

const API = {
	// 参数列表(分页)
	PARAMLIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/param/list/page',
}

// 获取岗位列表
export const reqParamListPage = (params) => {
	return request({
		url: API.PARAMLIST_PAGE_URL,
		method: 'get',
		params: params
	})
}