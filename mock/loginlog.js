import loginlogData from '../mockData/loginlog.js'

export default [
	// 获取登录日志列表
	{
		url: '/dev-api/system/loginlog/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: loginlogData,
				total: loginlogData.length,
				message: '操作成功'
			}
		}
	},
]