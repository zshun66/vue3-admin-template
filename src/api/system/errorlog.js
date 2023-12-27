import request from '@/utils/request.js'

const API = {
	// 错误日志列表(分页)
	ERRORLOGLIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/errorlog/list/page',
}

// 获取错误日志列表(分页)
export const reqErrorLogListPage = (params) => {
	return request({
		url: API.ERRORLOGLIST_PAGE_URL,
		method: 'get',
		params: params
	})
}