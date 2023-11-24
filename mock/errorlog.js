import errorlogData from '../mockData/errorlog.js'

export default [
	// 获取错误日志列表
	{
		url: '/dev-api/system/errorlog/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: errorlogData,
				total: errorlogData.length,
				message: '操作成功'
			}
		}
	},
]