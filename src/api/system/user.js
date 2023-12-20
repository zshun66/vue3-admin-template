import request from '@/utils/request.js'

const API = {
	// 用户登录
	LOGIN_URL: 'https://www.fastmock.site/mock/3ae7841ac891478dce1568a9b20de8e4/zve-admin/system/user/login',
	// 用户列表
	USERLIST_URL: 'https://www.fastmock.site/mock/3ae7841ac891478dce1568a9b20de8e4/zve-admin/system/user/list',
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

// 获取用户列表
export const reqUserList = (params) => {
	return request({
		url: API.USERLIST_URL,
		method: 'get',
		params: params
	})
}