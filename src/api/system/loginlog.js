import request from '@/utils/request.js'

const API = {
	// 登录日志列表(分页)
	LOGINLOGLIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/loginlog/list/page',
}

// 获取登录日志列表(分页)
export const reqLoginLogListPage = (params) => {
	return request({
		url: API.LOGINLOGLIST_PAGE_URL,
		method: 'get',
		params: params
	})
}