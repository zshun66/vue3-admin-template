import request from '@/utils/request.js'

// 获取部门列表(全部)
export const reqDeptListAll = () => {
	return request({
		url: '/system/dept/list/all',
		method: 'get',
	})
}

// 获取部门列表(分页)
export const reqDeptListPage = (params) => {
	return request({
		url: '/system/dept/list/page',
		method: 'get',
		params: params
	})
}