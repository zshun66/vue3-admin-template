import request from '@/utils/request.js'

const API = {
	// 部门列表(全部)
	DEPTLIST_ALL_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/dept/list/all',
	// 部门列表(分页)
	DEPTLIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/dept/list/page',
}

// 获取部门列表(全部)
export const reqDeptListAll = () => {
	return request({
		url: API.DEPTLIST_ALL_URL,
		method: 'get',
	})
}

// 获取部门列表(分页)
export const reqDeptListPage = (params) => {
	return request({
		url: API.DEPTLIST_PAGE_URL,
		method: 'get',
		params: params
	})
}