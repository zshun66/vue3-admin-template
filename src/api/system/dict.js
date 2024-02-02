import request from '@/utils/request.js'

// 获取字典类型列表(全部)
export const reqDictTypeListAll = () => {
	return request({
		url: '/system/dict/type/list/all',
		method: 'get',
	})
}

// 获取字典类型列表(分页)
export const reqDictTypeListPage = (params) => {
	return request({
		url: '/system/dict/type/list/page',
		method: 'get',
		params: params
	})
}

// 获取字典数据列表-根据字典类型Type(全部)
export const reqDictDataListAll = (type) => {
	return request({
		url: `/system/dict/data/list/all/${type}`,
		method: 'get'
	})
}

// 获取字典数据列表-根据字典类型ID(分页)
export const reqDictDataListPage = (params) => {
	return request({
		url: '/system/dict/data/list/page',
		method: 'get',
		params: params
	})
}