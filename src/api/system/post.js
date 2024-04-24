import request from '@/utils/request.js'

// 获取岗位列表(全部)
export const reqPostListAll = () => {
	return request({
		url: '/system/post/list/all',
		method: 'get',
	})
}

// 获取岗位列表(分页)
export const reqPostListPage = (params) => {
	return request({
		url: '/system/post/list/page',
		method: 'get',
		params: params
	})
}

// 添加岗位
export const reqAddPost = (data) => {
	return request({
		url: '/system/post/add',
		method: 'post',
		data: data
	})
}

// 修改岗位
export const reqUpdatePost = (data) => {
	return request({
		url: '/system/post/update',
		method: 'post',
		data: data
	})
}

// 删除岗位(可批量)
export const reqDeletePost = (ids) => {
	return request({
		url: '/system/post/delete',
		method: 'delete',
		params: { ids: ids }
	})
}