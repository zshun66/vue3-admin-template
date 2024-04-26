import request from '@/utils/request.js'

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

// 用户退出登录
export const reqUserLogout = () => {
	return request({
		url: '/system/user/logout',
		method: 'post',
	})
}