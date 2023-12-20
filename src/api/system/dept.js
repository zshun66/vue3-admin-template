import request from '@/utils/request.js'

const API = {
	// 部门列表
	DEPTLIST_URL: 'https://www.fastmock.site/mock/3ae7841ac891478dce1568a9b20de8e4/zve-admin/system/dept/list',
}

// 获取部门列表
export const reqDeptList = (params) => {
	return request({
		url: API.DEPTLIST_URL,
		method: 'get',
		params: params
	})
}