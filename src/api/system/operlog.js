import request from '@/utils/request.js'

const API = {
	// 操作日志列表(分页)
	OPERLOGLIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/operlog/list/page',
}

// 获取操作日志列表(分页)
export const reqOperLogListPage = (params) => {
	return request({
		url: API.OPERLOGLIST_PAGE_URL,
		method: 'get',
		params: params
	})
}