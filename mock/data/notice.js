// 通知公告列表
const noticeList = [
  {
      id: '1',
      title: '温馨提醒：2024-07-01 Zve新版本发布啦',
      type: '2',
      content: '新版本内容新版本内容新版本内容新版本内容新版本内容新版本内容新版本内容新版本内容新版本内容',
      status: '1',
      remark: '备注',
      creator: 'admin',
      createTime: '2024-04-23 16:13:51',
  },
  {
      id: '2',
      title: '维护通知：2023-07-01 Zve系统凌晨维护',
      type: '1',
      content: '维护内容维护内容维护内容维护内容维护内容维护内容维护内容维护内容维护内容维护内容维护内容',
      status: '1',
      remark: '',
      creator: 'admin',
      createTime: '2024-04-23 16:13:51',
  }
]

var pageNum = fox.mockRequest.getParam('pageNum') || 1
var pageSize = fox.mockRequest.getParam('pageSize') || 10
// 标题
var title = fox.mockRequest.getParam('title') || ''
// 类型
var type = fox.mockRequest.getParam('type') || ''
// 状态
var status = fox.mockRequest.getParam('status') || ''

// 过滤后的列表
var filterList = noticeList

if (title || title === 0) {
  filterList = filterList.filter(item => item.title === title)
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

export default noticeList