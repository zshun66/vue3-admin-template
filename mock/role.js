import roleData from '../mock_data/role.js'

export default [
  {
    url: '/api/system/role/list/all',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        data: roleData,
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/role/list/page',
    method: 'get',
    response: ({ query }) => {
      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 角色名称
      var name = query.name || ''
      // 角色状态
      var status = query.status || ''

      // 过滤后的列表
      var filterList = roleData

      if (name || name === 0) {
        filterList = filterList.filter(item => item.name.indexOf(name) > -1)
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
]