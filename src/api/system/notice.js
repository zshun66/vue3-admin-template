import request from '@/utils/request.js'

// 获取通知公告列表(分页)
export const reqNoticeListPage = (params) => {
	return request({
		url: '/system/notice/list/page',
		method: 'get',
		params: params
	})
}