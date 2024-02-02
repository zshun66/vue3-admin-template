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

// 用户登录
export const reqUserLogin = (data) => {
	return request({
		url: '/system/user/login',
		method: 'post',
		data: data,
		headers: {
			isAuth: false
		}
	})
}