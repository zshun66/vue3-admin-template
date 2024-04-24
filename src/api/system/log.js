import request from '@/utils/request.js'

// 获取登录日志列表(分页)
export const reqLoginLogListPage = (params) => {
	return request({
		url: '/system/loginlog/list/page',
		method: 'get',
		params: params
	})
}

// 删除登录日志(可批量、一键清空)
export const reqDeleteLoginLog = (ids) => {
	return request({
		url: '/system/loginlog/delete',
		method: 'delete',
		params: { ids: ids }
	})
}

// 获取操作日志列表(分页)
export const reqOperLogListPage = (params) => {
	return request({
		url: '/system/operlog/list/page',
		method: 'get',
		params: params
	})
}

// 删除操作日志(可批量、一键清空)
export const reqDeleteOperLog = (ids) => {
	return request({
		url: '/system/operlog/delete',
		method: 'delete',
		params: { ids: ids }
	})
}

// 获取错误日志列表(分页)
export const reqErrorLogListPage = (params) => {
	return request({
		url: '/system/errorlog/list/page',
		method: 'get',
		params: params
	})
}

// 删除错误日志(可批量、一键清空)
export const reqDeleteErrorLog = (ids) => {
	return request({
		url: '/system/errorlog/delete',
		method: 'delete',
		params: { ids: ids }
	})
}