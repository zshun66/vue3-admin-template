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
export const reqUserListPage = async (params) => {
	// return request({
	// 	url: API.USERLIST_PAGE_URL,
	// 	method: 'get',
	// 	params: params
	// })

	const { result } = await reqUserListAll()
	const allUserList = result.data || []

	let pageNum = params.pageNum || 1
	let pageSize = params.pageSize || 10
	let deptId = params.deptId || ''
	let username = params.username || ''
	let nickname = params.nickname || ''
	let phone = params.phone || ''
	let email = params.email || ''
	let status = params.status || ''
	let startDate = params.startDate || ''
	let endDate = params.endDate || ''

	// 过滤后的列表
	let filterList = allUserList

	if (deptId || deptId === 0) {
		filterList = filterList.filter(item => item.dept.id === deptId)
	}
	if (username || username === 0) {
		filterList = filterList.filter(item => item.username === username)
	}
	if (nickname || nickname === 0) {
		filterList = filterList.filter(item => item.nickname === nickname)
	}
	if (phone || phone === 0) {
		filterList = filterList.filter(item => item.phone === phone)
	}
	if (email || email === 0) {
		filterList = filterList.filter(item => item.email === email)
	}
	if (status || status === 0) {
		filterList = filterList.filter(item => item.status === status)
	}
	if ((startDate || startDate === 0) && (endDate || endDate === 0)) {
		filterList = filterList.filter(item => {
			var sT = new Date(startDate).getTime()
			var eT = new Date(endDate).getTime()
			var rT = new Date(item.createTime).getTime()
			return rT >= sT && rT <= eT
		})
	}

	// 结果列表
	var resultList = []
	// 数据总数
	var resultTotal = 0

	if (pageNum > Math.ceil(filterList.length / pageSize)) {
		resultList = []
		resultTotal = 0
	} else {
		resultList = filterList.filter((item, index) => {
			return index >= (pageNum - 1) * pageSize && index < (pageNum) * pageSize
		})
		resultTotal = filterList.length
	}

	return {
		result: {
			data: {
				list: resultList,
				total: resultTotal
			},
			message: '操作成功',
			code: 200
		},
		error: null
	}
}

// 登录
export const reqUserLogin = async (data) => {
	// return request({
	// 	url: API.USERLOGIN_URL,
	// 	method: 'post',
	// 	data: data,
	// 	headers: {
	// 		isAuth: false
	// 	}
	// })

	const { result: result1 } = await reqUserListAll()
	const allUserList = result1.data || []

	let username = data.username || ''
	let password = data.password || ''

	const findRes = allUserList.find(item => item.username === username && item.password === password)
	if (findRes) {
		const { result: result2 } = await reqMenuListAll()
		const allMenuList = result2.data || []
		if (username === 'admin') {
			findRes.menus = allMenuList
		} else if (username === 'developer') {
			findRes.menus = allMenuList.filter(item => item.id === '99' || item.id === '1')
		}
		return {
			result: {
				data: findRes,
				message: '操作成功',
				code: 200
			},
			error: null
		}
	}
	return {
		result: null,
		error: '用户名或密码错误'
	}
}