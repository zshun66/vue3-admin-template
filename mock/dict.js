import dictData from '../mockData/dict.js'

export default [
	// 获取字典类型列表
	{
		url: '/dev-api/system/dict/type/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: dictData,
				total: dictData.length,
				message: '操作成功'
			}
		}
	},
	// 获取字典数据列表
	{
		url: '/dev-api/system/dict/data/list',
		method: 'get',
		response: (request) => {
			const query = request.query
			const findRes = dictData.find(item => item.id == query.nameId)
			const data = findRes ? findRes.options : []
			return {
				code: 200,
				data: data,
				total: data.length,
				message: '操作成功'
			}
		}
	},
]