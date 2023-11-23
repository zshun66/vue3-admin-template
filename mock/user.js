import userData from '../mockData/user.js'

export default [
	// 用户登录接口
	{
		url: '/dev-api/system/user/login',
		method: 'post',
		response: ({ body }) => {
			const { username, password } = body
			const checkUser = userData.find((item, index) => {
				return item.username === username && item.password === password
			})
			if (!checkUser) {
				return {
					code: 201,
					data: null,
					message: '账号或密码不正确'
				}
			}
			return {
				code: 200,
				data: { 
					token: checkUser.token
				},
				message: '操作成功'
			}
		},
	},
	// 获取用户详细信息
	{
		url: '/dev-api/system/user/info',
		method: 'get',
		response: (request) => {
			const token = request.headers.authorization.substr(7, 100)
			const checkUser = userData.find((item) => item.token === token)
			if (!checkUser) {
				return {
					code: 401,
					data: null,
					message: '登录信息已失效，请重新登录'
				}
			}
			return {
				code: 200,
				data: { 
					userInfo: checkUser
				},
				message: '操作成功'
			}
		},
	},
	// 获取用户列表
	{
		url: '/dev-api/system/user/list',
		method: 'get',
		response: (request) => {
			return {
				code: 200,
				data: userData,
				total: userData.length,
				message: '操作成功'
			}
		}
	},
]