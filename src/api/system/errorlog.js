import request from '@/utils/request.js'

const API = {
	// 错误日志列表
	ERRORLOGLIST_URL: 'https://www.fastmock.site/mock/3ae7841ac891478dce1568a9b20de8e4/zve-admin/system/errorlog/list',
}

// 获取错误日志列表
export const reqErrorLogList = (params) => {
	return request({
		url: API.ERRORLOGLIST_URL,
		method: 'get',
		params: params
	})
}