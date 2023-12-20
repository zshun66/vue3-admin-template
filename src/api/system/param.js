import request from '@/utils/request.js'

const API = {
	// 参数列表
	PARAMLIST_URL: 'https://www.fastmock.site/mock/3ae7841ac891478dce1568a9b20de8e4/zve-admin/system/param/list',
}

// 获取岗位列表
export const reqParamList = (params) => {
	return request({
		url: API.PARAMLIST_URL,
		method: 'get',
		params: params
	})
}