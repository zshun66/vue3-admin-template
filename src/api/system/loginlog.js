import request from '@/utils/request.js'

const API = {
	// 登录日志列表
	LOGINLOGLIST_URL: 'https://www.fastmock.site/mock/3ae7841ac891478dce1568a9b20de8e4/zve-admin/system/loginlog/list',
}

// 获取登录日志列表
export const reqLoginLogList = (params) => {
	return request({
		url: API.LOGINLOGLIST_URL,
		method: 'get',
		params: params
	})
}