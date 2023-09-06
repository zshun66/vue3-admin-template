import request from '@/utils/request.js'

const API = {
	LOGIN_URL: '/user/login',
	USERINFO_URL: '/user/info',
}

// 登录
export const reqLogin = (data) => {
	return request({
		url: API.LOGIN_URL,
		method: 'post',
		data: data
	})
}

// 获取用户信息
export const reqUserInfo = () => {
	return request({
		url: API.USERINFO_URL,
		method: 'get'
	})
}