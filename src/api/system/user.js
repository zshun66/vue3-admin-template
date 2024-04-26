import request from '@/utils/request.js'

// 获取用户列表(全部)
export const reqUserListAll = () => {
	return request({
		url: '/system/user/list/all',
		method: 'get',
	})
}

// 获取用户列表(分页)
export const reqUserListPage = (params) => {
	return request({
		url: '/system/user/list/page',
		method: 'get',
		params: params
	})
}

// 添加用户
export const reqAddUser = (data) => {
	return request({
		url: '/system/user/add',
		method: 'post',
		data: data
	})
}

// 修改用户
export const reqUpdateUser = (data) => {
	return request({
		url: '/system/user/update',
		method: 'post',
		data: data
	})
}

// 删除用户(可批量)
export const reqDeleteUser = (ids) => {
	return request({
		url: '/system/user/delete',
		method: 'delete',
		params: { ids: ids }
	})
}