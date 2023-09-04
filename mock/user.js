// 用户信息数据
function createUserList() {
	return [
		{
			userId: 1,
			avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
			nickname: '超级管理员',
			username: 'admin',
			password: '111111',
			roles: ['超级管理员'],
			routes: ['home'],
			buttons: ['cuser.detail'],
			token: 'Admin Token',
		},
		{
			userId: 2,
			avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
			nickname: '系统管理员',
			username: 'system',
			password: '111111',
			roles: ['系统管理员'],
			routes: ['home'],
			buttons: ['cuser.detail', 'cuser.user'],
			token: 'System Token',
		},
	]
}

export default [
	// 用户登录接口
	{
		url: '/dev-api/user/login',
		method: 'post',
		response: ({ body }) => {
			const { username, password } = body
			const checkUser = createUserList().find(
				(item) => item.username === username && item.password === password,
			)
			if (!checkUser) {
				return { code: 201, data: null, message: '账号或密码不正确' }
			}
			const { token } = checkUser
			return { code: 200, data: { token }, message: '操作成功' }
		},
	},
	// 获取用户信息
	{
		url: '/dev-api/user/info',
		method: 'get',
		response: (request) => {
			const token = request.headers.authorization.substr(7, 100)
			const checkUser = createUserList().find((item) => item.token === token)
			if (!checkUser) {
				return { code: 201, data: null, message: '获取用户信息失败' }
			}
			return { code: 200, data: { userInfo: checkUser }, message: '操作成功' }
		},
	},
]