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

// 添加字典类型
export const reqAddDictType = (data) => {
	return request({
		url: '/system/dict/type/add',
		method: 'post',
		data: data
	})
}

// 修改字典类型
export const reqUpdateDictType = (data) => {
	return request({
		url: '/system/dict/type/update',
		method: 'post',
		data: data
	})
}

// 删除字典类型(可批量)
export const reqDeleteDictType = (ids) => {
	return request({
		url: '/system/dict/type/delete',
		method: 'delete',
		params: { ids: ids }
	})
}

// -----------------------------------------------------------------------------------------

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

// 添加字典数据
export const reqAddDictData = (data) => {
	return request({
		url: '/system/dict/data/add',
		method: 'post',
		data: data
	})
}

// 修改字典数据
export const reqUpdateDictData = (data) => {
	return request({
		url: '/system/dict/data/update',
		method: 'post',
		data: data
	})
}

// 删除字典数据(可批量)
export const reqDeleteDictData = (ids) => {
	return request({
		url: '/system/dict/data/delete',
		method: 'delete',
		params: { ids: ids }
	})
}