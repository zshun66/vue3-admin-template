import menuData from '../mock_data/menu.js'

export default [
  {
    url: '/api/system/menu/list/all',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      return {
        code: 200,
        data: menuData,
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/menu/list/page',
    method: 'get',
    timeout: 300,
    response: ({ query }) => {
      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 菜单标题
      var title = query.title || ''
      // 菜单状态
      var status = query.status || ''

      // 过滤后的列表
      var filterList = menuData

      if (title || title === 0) {
        filterList = filterList.filter(item => item.title.indexOf(title) > -1)
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
    url: '/api/system/menu/add',
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
    url: '/api/system/menu/update',
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
    url: '/api/system/menu/delete',
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