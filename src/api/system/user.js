import request from '@/utils/request.js'

const API = {
	// 用户登录
	LOGIN_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/user/login',
	// 用户列表(分页)
	USERLIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/user/list/page',
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

// 获取用户列表(分页)
export const reqUserListPage = (params) => {
	return request({
		url: API.USERLIST_PAGE_URL,
		method: 'get',
		params: params
	})
}