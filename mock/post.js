import { postData } from '../mockData/index.js'

export default [
	// 获取岗位列表
	{
		url: '/dev-api/post/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: postData,
				message: '操作成功'
			}
		}
	},
]