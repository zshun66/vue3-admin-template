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
export const reqDictTypeListPage = (params) => {
	return request({
		url: API.DICTTYPELIST_PAGE_URL,
		method: 'get',
		params: params
	})
}

// 获取字典数据列表
export const reqDictDataListPage = (params) => {
	return request({
		url: API.DICTDATALIST_PAGE_URL,
		method: 'get',
		params: params
	})
}