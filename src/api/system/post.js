import request from '@/utils/request.js'

const API = {
	// 岗位列表
	POSTLIST_URL: 'https://www.fastmock.site/mock/3ae7841ac891478dce1568a9b20de8e4/zve-admin/system/post/list',
}

// 获取岗位列表
export const reqPostList = (params) => {
	return request({
		url: API.POSTLIST_URL,
		method: 'get',
		params: params
	})
}