import request from '@/utils/request.js'

const API = {
	// 操作日志列表
	OPERLOGLIST_URL: 'https://www.fastmock.site/mock/3ae7841ac891478dce1568a9b20de8e4/zve-admin/system/operlog/list',
}

// 获取操作日志列表
export const reqOperLogList = (params) => {
	return request({
		url: API.OPERLOGLIST_URL,
		method: 'get',
		params: params
	})
}