import request from '@/utils/request.js'

const API = {
	// 角色列表(全部)
	ROLELIST_ALL_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/role/list/all',
	// 角色列表(分页)
	ROLELIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/role/list/page',
}

// 获取角色列表(全部)
export const reqRoleListAll = () => {
	return request({
		url: API.ROLELIST_ALL_URL,
		method: 'get',
	})
}

// 获取角色列表(分页)
export const reqRoleListPage = async (params) => {
	const { result } = await reqRoleListAll()
	const allRoleList = result.data || []

	let pageNum = params.pageNum || 1
	let pageSize = params.pageSize || 10
	let name = params.name || ''
	let status = params.status || ''

	// 过滤后的列表
	let filterList = allRoleList

	if (name || name === 0) {
		filterList = filterList.filter(item => item.name === name)
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