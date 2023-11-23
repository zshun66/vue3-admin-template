import menuData from '../mockData/menu.js'

export default [
	// 获取菜单列表
	{
		url: '/dev-api/system/menu/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: menuData,
				total: menuData.length,
				message: '操作成功'
			}
		}
	},
]