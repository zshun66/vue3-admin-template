import request from '@/utils/request.js'

const API = {
	// 菜单列表(全部)
	MENULIST_ALL_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/menu/list/all',
	// 菜单列表(分页)
	MENULIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/menu/list/page',
}

// 获取菜单列表(全部)
export const reqMenuListAll = () => {
	return request({
		url: API.MENULIST_ALL_URL,
		method: 'get',
	})
}

// 获取菜单列表(分页)
export const reqMenuListPage = async (params) => {
	const { result } = await reqMenuListAll()
	const allMenuList = result.data || []
	await request({
		url: API.MENULIST_PAGE_URL,
		method: 'get',
		params: params,
	})

	let pageNum = params.pageNum || 1
	let pageSize = params.pageSize || 10
	let title = params.title || ''
	let status = params.status || ''

	// 过滤后的列表
	let filterList = allMenuList

	if (title || title === 0) {
		filterList = filterList.filter(item => item.title === title)
	}
	if (status || status === 0) {
		filterList = filterList.filter(item => item.status === status)
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