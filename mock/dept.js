import deptData from '../mockData/dept.js'

export default [
	// 获取菜单列表
	{
		url: '/dev-api/dept/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: deptData,
				total: deptData.length,
				message: '操作成功'
			}
		}
	},
]