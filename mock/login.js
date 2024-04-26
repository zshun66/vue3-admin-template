import userData from '../mock_data/user.js'

export default [
  {
    url: '/api/system/user/login',
    method: 'post',
    timeout: 1000,
    response: ({ body }) => {
      var username = body.username || ''
      var password = body.password || ''

      var message = ''
      var code = 200
      var userInfo = null
      const findRes = userData.find(item => item.username === username && item.password === password)
      if (findRes) {
        userInfo = findRes
        message = '操作成功'
        code = 200
      } else {
        userInfo = null
        message = '用户名或密码错误'
        code = 500
      }

      return {
        code: code,
        data: userInfo,
        message: message,
      }
    }
  },
  {
    url: '/api/system/user/logout',
    method: 'post',
    timeout: 500,
    response: ({ body }) => {
      return {
        code: 200,
        data: null,
        message: '操作成功',
      }
    }
  }
]