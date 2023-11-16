import roleData from '../mockData/role.js'

export default [
	// 获取角色列表
	{
		url: '/dev-api/role/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: roleData,
				total: roleData.length,
				message: '操作成功'
			}
		}
	},
]