import operatelogData from '../mockData/operatelog.js'

export default [
	// 获取操作日志列表
	{
		url: '/dev-api/system/operatelog/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: operatelogData,
				total: operatelogData.length,
				message: '操作成功'
			}
		}
	},
]