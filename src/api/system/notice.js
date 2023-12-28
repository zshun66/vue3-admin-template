import request from '@/utils/request.js'

const API = {
	// 通知公告列表(分页)
	NOTICELIST_PAGE_URL: 'https://mock.apifox.com/m1/3799957-0-default/system/notice/list/page',
}

// 获取通知公告列表(分页)
export const reqNoticeListPage = (params) => {
	return request({
		url: API.NOTICELIST_PAGE_URL,
		method: 'get',
		params: params
	})
}