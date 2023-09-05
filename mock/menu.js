import { menuData } from '../mockData/index.js'

export default [
	// 获取菜单列表
	{
		url: '/dev-api/menu/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: menuData,
				message: '操作成功'
			}
		}
	},
]