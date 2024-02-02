import operLogData from '../mock_data/operlog.js'

export default [
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
      var filterList = operLogData

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
]