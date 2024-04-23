import deptData from '../mock_data/dept.js'

export default [
  {
    url: '/api/system/dept/list/all',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      return {
        code: 200,
        data: deptData,
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/dept/list/page',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 部门名称
      var name = query.name || ''
      // 部门状态
      var status = query.status || ''

      // 过滤后的列表
      var filterList = deptData

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
  {
    url: '/api/system/dept/add',
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
    url: '/api/system/dept/update',
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
    url: '/api/system/dept/delete',
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