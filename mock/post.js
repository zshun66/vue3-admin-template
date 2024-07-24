import postData from '../database/operdata/post.json'
import fs from 'fs'

export default [
  {
    url: '/api/system/post/list/all',
    method: 'get',
    timeout: 300,
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
    timeout: 300,
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
  {
    url: '/api/system/post/add',
    method: 'post',
    timeout: 500,
    response: ({ body }) => {
      const newPost = {
        ...body,
        id: (postData.length + 1).toString(),
        creator: '超级管理员',
        createTime: '2024-07-24 11:11:11',
      }
      const newPostData = [...postData, newPost]
      fs.writeFileSync('./database/operdata/post.json', JSON.stringify(newPostData, null, 2))
      return {
        code: 200,
        data: null,
        message: '操作成功',
      }
    }
  },
  {
    url: '/api/system/post/update',
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
    url: '/api/system/post/delete',
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