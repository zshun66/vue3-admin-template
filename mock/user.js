import userData from '../mock_data/user.js'

export default [
  {
    url: '/api/system/user/list/all',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        data: userData,
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/user/list/page',
    method: 'get',
    response: ({ query }) => {
      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 用户名称
      var username = query.username || ''
      // 用户昵称
      var nickname = query.nickname || ''
      // 手机号
      var phone = query.phone || ''
      // 邮箱
      var email = query.email || ''
      // 状态
      var status = query.status || ''
      // 开始日期
      var startDate = query.startDate || ''
      // 结束日期
      var endDate = query.endDate || ''
      // 所属部门
      var deptId = query.deptId || ''

      // 过滤后的列表
      var filterList = userData

      if (username || username === 0) {
        filterList = filterList.filter(item => item.username.indexOf(username) > -1)
      }
      if (nickname || nickname === 0) {
        filterList = filterList.filter(item => item.nickname.indexOf(nickname) > -1)
      }
      if (phone || phone === 0) {
        filterList = filterList.filter(item => item.phone.indexOf(phone) > -1)
      }
      if (email || email === 0) {
        filterList = filterList.filter(item => item.email.indexOf(email) > -1)
      }
      if (status || status === 0) {
        filterList = filterList.filter(item => item.status === status)
      }
      if ((startDate || startDate === 0) && (endDate || endDate === 0)) {
        filterList = filterList.filter(item => {
          var sT = new Date(startDate).getTime()
          var eT = new Date(endDate).getTime()
          var rT = new Date(item.loginTime).getTime()
          return rT >= sT && rT <= eT
        })
      }
      if (deptId || deptId === 0) {
        filterList = filterList.filter(item => item.dept.id === deptId)
      }

      // 结果列表
      var resultList = []
      // 数据总数
      var resultTotal = 0

      if (pageNum > Math.ceil(filterList.length / pageSize)) {
        resultList = []
        resultTotal = 0
      } else {
        resultList = filterList.filter((item, index) => {
          return index >= (pageNum - 1) * pageSize && index < (pageNum) * pageSize
        })
        resultTotal = filterList.length
      }

      return {
        code: 200,
        data: {
          list: resultList,
          total: resultTotal
        },
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/user/login',
    method: 'post',
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
    response: ({ body }) => {
      return {
        code: 200,
        data: null,
        message: '操作成功',
      }
    }
  }
]