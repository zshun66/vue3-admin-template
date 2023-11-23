import postData from '../mockData/post.js'

export default [
	// 获取岗位列表
	{
		url: '/dev-api/system/post/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: postData,
				total: postData.length,
				message: '操作成功'
			}
		}
	},
]