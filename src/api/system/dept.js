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

// 添加部门
export const reqAddDept = (data) => {
	return request({
		url: '/system/dept/add',
		method: 'post',
		data: data
	})
}

// 修改部门
export const reqUpdateDept = (data) => {
	return request({
		url: '/system/dept/update',
		method: 'post',
		data: data
	})
}

// 删除部门(可批量)
export const reqDeleteDept = (ids) => {
	return request({
		url: '/system/dept/delete',
		method: 'delete',
		params: { ids: ids }
	})
}