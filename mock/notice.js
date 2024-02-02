import noticeData from '../mock_data/notice.js'

export default [
  {
    url: '/api/system/notice/list/all',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        data: noticeData,
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/notice/list/page',
    method: 'get',
    response: ({ query }) => {
      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 标题
      var title = query.title || ''
      // 类型
      var type = query.type || ''
      // 状态
      var status = query.status || ''

      // 过滤后的列表
      var filterList = noticeData

      if (title || title === 0) {
        filterList = filterList.filter(item => item.title.indexOf(title) > -1)
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
]