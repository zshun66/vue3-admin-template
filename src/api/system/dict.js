import request from '@/utils/request.js'

const API = {
	// 字典类型列表
	DICTTYPELIST_URL: '/system/dict/type/list',
	// 字典数据列表
	DICTDATALIST_URL: '/system/dict/data/list',
}

// 获取字典类型列表
export const reqDictTypeList = (params) => {
	return request({
		url: API.DICTTYPELIST_URL,
		method: 'get',
		params: params
	})
}

// 获取字典数据列表
export const reqDictDataList = (params) => {
	return request({
		url: API.DICTDATALIST_URL,
		method: 'get',
		params: params
	})
}