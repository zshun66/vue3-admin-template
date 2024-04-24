import paramData from '../mock_data/param.js'

export default [
  {
    url: '/api/system/param/list/page',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 参数名称
      var name = query.name || ''
      // 参数键名
      var key = query.key || ''
      // 系统内置
      var type = query.type || ''
      // 参数状态
      var status = query.status || ''

      // 过滤后的列表
      var filterList = paramData

      if (name || name === 0) {
        filterList = filterList.filter(item => item.name.indexOf(name) > -1)
      }
      if (key || key === 0) {
        filterList = filterList.filter(item => item.key.indexOf(key) > -1)
      }
      if (type || type === 0) {
        filterList = filterList.filter(item => item.type === type)
      }
      if (status || status === 0) {
        filterList = filterList.filter(item => item.status === status)
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
    url: '/api/system/param/add',
    method: 'post',
    timeout: 500,
    response: ({ body }) => {
      return {
        code: 200,
        data: null,
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/param/update',
    method: 'post',
    timeout: 500,
    response: ({ body }) => {
      return {
        code: 200,
        data: null,
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/param/delete',
    method: 'delete',
    timeout: 500,
    response: ({ query }) => {
      return {
        code: 200,
        data: null,
        message: '操作成功',
      }
    }
  }
]