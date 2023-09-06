import { roleData } from '../mockData/index.js'

export default [
	// 获取角色列表
	{
		url: '/dev-api/role/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: roleData,
				total: 3,
				message: '操作成功'
			}
		}
	},
]