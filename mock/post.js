import postData from '../mock_data/post.js'

export default [
  {
    url: '/api/system/post/list/all',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        data: postData,
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/post/list/page',
    method: 'get',
    response: ({ query }) => {
      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 岗位名称
      var name = query.name || ''
      // 岗位编码
      var code = query.code || ''
      // 岗位状态
      var status = query.status || ''

      // 过滤后的列表
      var filterList = postData

      if (name || name === 0) {
        filterList = filterList.filter(item => item.name.indexOf(name) > -1)
      }
      if (code || code === 0) {
        filterList = filterList.filter(item => item.code.indexOf(code) > -1)
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