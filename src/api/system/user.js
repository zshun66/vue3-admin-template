import request from '@/utils/request.js'

const API = {
	// 用户登录
	LOGIN_URL: '/system/user/login',
	// 用户详细信息
	USERINFO_URL: '/system/user/info',
	// 用户列表
	USERLIST_URL: '/system/user/list',
}

// 登录
export const reqLogin = (data) => {
	return request({
		url: API.LOGIN_URL,
		method: 'post',
		data: data,
		headers: {
			isAuth: false
		}
	})
}

// 获取用户详细信息
export const reqUserInfo = () => {
	return request({
		url: API.USERINFO_URL,
		method: 'get'
	})
}

// 获取用户列表
export const reqUserList = (params) => {
	return request({
		url: API.USERLIST_URL,
		method: 'get',
		params: params
	})
}