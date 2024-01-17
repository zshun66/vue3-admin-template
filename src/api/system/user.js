import request from '@/utils/request.js'
import { reqMenuListAll } from './menu.js'

const API = {
	// 用户列表(全部)
	USERLIST_ALL_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/user/list/all',
	// 用户列表(分页)
	USERLIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/user/list/page',
	// 用户登录
	USERLOGIN_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/user/login',
}

// 获取用户列表(全部)
export const reqUserListAll = () => {
	return request({
		url: API.USERLIST_ALL_URL,
		method: 'get',
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

// 登录
export const reqUserLogin = (data) => {
	return request({
		url: API.USERLOGIN_URL,
		method: 'post',
		data: data,
		headers: {
			isAuth: false
		}
	})
}