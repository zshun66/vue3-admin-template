import { loginLogList, operLogList, errorLogList } from '../mock_data/log.js'

export default [
  {
    url: '/api/system/loginlog/list/page',
    method: 'get',
    response: ({ query }) => {
      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 用户昵称
      var nickname = query.nickname || ''
      // 用户名称
      var username = query.username || ''
      // 登录地址
      var ipAddr = query.ipAddr || ''
      // 登录地点
      var loginLoc = query.loginLoc || ''
      // 登录状态
      var status = query.status || ''
      // 开始日期
      var startLoginTime = query.startLoginTime || ''
      // 结束日期
      var endLoginTime = query.endLoginTime || ''

      // 过滤后的列表
      var filterList = loginLogList

      if (nickname || nickname === 0) {
        filterList = filterList.filter(item => item.nickname.indexOf(nickname) > -1)
      }
      if (username || username === 0) {
        filterList = filterList.filter(item => item.username.indexOf(username) > -1)
      }
      if (ipAddr || ipAddr === 0) {
        filterList = filterList.filter(item => item.ipAddr.indexOf(ipAddr) > -1)
      }
      if (loginLoc || loginLoc === 0) {
        filterList = filterList.filter(item => item.loginLoc.indexOf(loginLoc) > -1)
      }
      if (status || status === 0) {
        filterList = filterList.filter(item => item.status === status)
      }
      if ((startLoginTime || startLoginTime === 0) && (endLoginTime || endLoginTime === 0)) {
        filterList = filterList.filter(item => {
          var sT = new Date(startLoginTime).getTime()
          var eT = new Date(endLoginTime).getTime()
          var rT = new Date(item.loginTime).getTime()
          return rT >= sT && rT <= eT
        })
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
    url: '/api/system/operlog/list/page',
    method: 'get',
    response: ({ query }) => {
      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 系统模块
      var title = query.title || ''
      // 操作地址
      var operIp = query.operIp || ''
      // 操作地点
      var operLoc = query.operLoc || ''
      // 操作人
      var operName = query.operName || ''
      // 操作类型
      var operType = query.operType || ''
      // 操作状态
      var status = query.status || ''
      // 开始日期
      var startOperTime = query.startOperTime || ''
      // 结束日期
      var endOperTime = query.endOperTime || ''

      // 过滤后的列表
      var filterList = operLogList

      if (title || title === 0) {
        filterList = filterList.filter(item => item.title.indexOf(title) > -1)
      }
      if (operIp || operIp === 0) {
        filterList = filterList.filter(item => item.operIp.indexOf(operIp) > -1)
      }
      if (operLoc || operLoc === 0) {
        filterList = filterList.filter(item => item.operLoc.indexOf(operLoc) > -1)
      }
      if (operName || operName === 0) {
        filterList = filterList.filter(item => item.operName.indexOf(operName) > -1)
      }
      if (operType || operType === 0) {
        filterList = filterList.filter(item => item.operType.operType === operType)
      }
      if (status || status === 0) {
        filterList = filterList.filter(item => item.status === status)
      }
      if ((startOperTime || startOperTime === 0) && (endOperTime || endOperTime === 0)) {
        filterList = filterList.filter(item => {
          var sT = new Date(startOperTime).getTime()
          var eT = new Date(endOperTime).getTime()
          var rT = new Date(item.loginTime).getTime()
          return rT >= sT && rT <= eT
        })
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
    url: '/api/system/errorlog/list/page',
    method: 'get',
    response: ({ query }) => {
      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 用户昵称
      var nickname = query.nickname || ''
      // 用户名称
      var username = query.username || ''
      // 登录地址
      var ipAddr = query.ipAddr || ''
      // 登录地点
      var loginLoc = query.loginLoc || ''
      // 登录状态
      var status = query.status || ''
      // 开始日期
      var startLoginTime = query.startLoginTime || ''
      // 结束日期
      var endLoginTime = query.endLoginTime || ''

      // 过滤后的列表
      var filterList = errorLogList

      if (nickname || nickname === 0) {
        filterList = filterList.filter(item => item.nickname.indexOf(nickname) > -1)
      }
      if (username || username === 0) {
        filterList = filterList.filter(item => item.username.indexOf(username) > -1)
      }
      if (ipAddr || ipAddr === 0) {
        filterList = filterList.filter(item => item.ipAddr.indexOf(ipAddr) > -1)
      }
      if (loginLoc || loginLoc === 0) {
        filterList = filterList.filter(item => item.loginLoc.indexOf(loginLoc) > -1)
      }
      if (status || status === 0) {
        filterList = filterList.filter(item => item.status === status)
      }
      if ((startLoginTime || startLoginTime === 0) && (endLoginTime || endLoginTime === 0)) {
        filterList = filterList.filter(item => {
          var sT = new Date(startLoginTime).getTime()
          var eT = new Date(endLoginTime).getTime()
          var rT = new Date(item.loginTime).getTime()
          return rT >= sT && rT <= eT
        })
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
]