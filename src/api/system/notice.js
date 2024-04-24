import request from '@/utils/request.js'

// 获取通知公告列表(分页)
export const reqNoticeListPage = (params) => {
	return request({
		url: '/system/notice/list/page',
		method: 'get',
		params: params
	})
}

// 添加通知公告
export const reqAddNotice = (data) => {
	return request({
		url: '/system/notice/add',
		method: 'post',
		data: data
	})
}

// 修改通知公告
export const reqUpdateNotice = (data) => {
	return request({
		url: '/system/notice/update',
		method: 'post',
		data: data
	})
}

// 删除通知公告(可批量)
export const reqDeleteNotice = (ids) => {
	return request({
		url: '/system/notice/delete',
		method: 'delete',
		params: { ids: ids }
	})
}