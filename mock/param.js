import paramData from '../mockData/param.js'

export default [
	// 获取参数列表
	{
		url: '/dev-api/system/param/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: paramData,
				total: paramData.length,
				message: '操作成功'
			}
		}
	},
]