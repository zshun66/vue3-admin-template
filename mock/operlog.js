import operlogData from '../mockData/operlog.js'

export default [
	// 获取操作日志列表
	{
		url: '/dev-api/system/operlog/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: operlogData,
				total: operlogData.length,
				message: '操作成功'
			}
		}
	},
]