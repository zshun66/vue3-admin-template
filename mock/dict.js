import { dictTypeListAll, dictDataListAll } from '../mock_data/dict.js'

export default [
  {
    url: '/api/system/dict/type/list/all',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        data: dictTypeListAll,
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/dict/type/list/page',
    method: 'get',
    response: ({ query }) => {
      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 字典类型名称
      var name = query.name || ''
      // 字典类型
      var type = query.type || ''
      // 字典类型状态
      var status = query.status || ''

      // 过滤后的列表
      var filterList = dictTypeListAll

      if (name || name === 0) {
        filterList = filterList.filter(item => item.name.indexOf(name) > -1)
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
    url: /\/api\/system\/dict\/data\/list\/all\/(.+)/,
    method: 'get',
    response: ({ params }) => {
      const type = params[0]

      // 字典数据列表
      var dictDataList = dictDataListAll.find(item => item.type === type)?.options || []

      return {
        code: 200,
        data: dictDataList,
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/dict/data/list/page',
    method: 'get',
    response: ({ query }) => {
      // 字典数据列表
      var dictDataList = []
      // 字典类型ID
      var typeId = query.typeId || ''
      dictDataList = dictDataListAll.find(item => item.typeId === typeId)?.options || []

      var pageNum = query.pageNum || 1
      var pageSize = query.pageSize || 10
      // 字典标签
      var label = query.label || ''
      // 字典状态
      var status = query.status || ''

      // 过滤后的列表
      var filterList = dictDataList

      if (label || label === 0) {
        filterList = filterList.filter(item => item.label.indexOf(label) > -1)
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