import request from '@/utils/request.js'

const API = {
	// 字典类型列表(全部)
	DICTTYPELIST_ALL_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/dict/type/list/all',
	// 字典类型列表(分页)
	DICTTYPELIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/dict/type/list/page',
	// 字典数据列表(分页)
	DICTDATALIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/dict/data/list/page',
}

// 获取字典类型列表(全部)
export const reqDictTypeListAll = () => {
	return request({
		url: API.DICTTYPELIST_ALL_URL,
		method: 'get',
	})
}

// 获取字典类型列表(分页)
export const reqDictTypeListPage = async (params) => {
	const { result } = await reqDictTypeListAll()
	const allDictTypeList = result.data || []

	let pageNum = params.pageNum || 1
	let pageSize = params.pageSize || 10
	let name = params.name || ''
	let type = params.type || ''
	let status = params.status || ''

	// 过滤后的列表
	let filterList = allDictTypeList

	if (name || name === 0) {
		filterList = filterList.filter(item => item.name === name)
	}
	if (type || type === 0) {
		filterList = filterList.filter(item => item.type === type)
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

// 获取字典数据列表(分页)
export const reqDictDataListPage = (params) => {
	return request({
		url: API.DICTDATALIST_PAGE_URL,
		method: 'get',
		params: params
	})
}