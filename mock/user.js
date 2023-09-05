import { userData } from '../mockData/index.js'

export default [
	// 用户登录接口
	{
		url: '/dev-api/user/login',
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
	// 获取用户信息
	{
		url: '/dev-api/user/info',
		method: 'get',
		response: (request) => {
			const token = request.headers.authorization.substr(7, 100)
			const checkUser = userData.find((item) => item.token === token)
			if (!checkUser) {
				return {
					code: 201,
					data: null,
					message: '获取用户信息失败'
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
]