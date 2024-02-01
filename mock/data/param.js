// 参数列表
const paramList = [
  {
      id: '1',
      name: '主框架页-默认皮肤样式名称',
      key: 'sys.index.skinName',
      value: 'skin-blue',
      type: '1',
      status: '1',
      remark: '蓝色 skin-blue、绿色 skin-green、紫色 skin-purple、红色 skin-red、黄色 skin-yellow',
      creator: '超级管理员',
      createTime: '2023-11-13 17:08:36'
  },
  {
      id: '2',
      name: '用户管理-账号初始密码',
      key: 'sys.user.initPassword',
      value: '123456',
      type: '1',
      status: '1',
      remark: '初始化密码 123456',
      creator: '超级管理员',
      createTime: '2023-11-13 17:08:36'
  },
  {
      id: '3',
      name: '主框架页-侧边栏主题',
      key: 'sys.index.sideTheme',
      value: 'theme-dark',
      type: '1',
      status: '1',
      remark: '深色主题theme-dark，浅色主题theme-light',
      creator: '超级管理员',
      createTime: '2023-11-13 17:08:36'
  },
  {
      id: '4',
      name: '账号自助-验证码开关',
      key: 'sys.account.captchaEnabled',
      value: 'true',
      type: '1',
      status: '1',
      remark: '是否开启验证码功能（true开启，false关闭）',
      creator: '超级管理员',
      createTime: '2023-11-13 17:08:36'
  },
  {
      id: '5',
      name: '账号自助-是否开启用户注册功能',
      key: 'sys.account.registerUser',
      value: 'false',
      type: '0',
      status: '1',
      remark: '是否开启注册用户功能（true开启，false关闭）',
      creator: '超级管理员',
      createTime: '2023-11-13 17:08:36'
  },
  {
      id: '6',
      name: '用户登录-黑名单列表',
      key: 'sys.login.blackIPList',
      value: '203.2.12.105',
      type: '1',
      status: '1',
      remark: '设置登录IP黑名单限制，多个匹配项以;分隔，支持匹配（*通配、网段）',
      creator: '超级管理员',
      createTime: '2023-11-13 17:08:36'
  }
]

var pageNum = fox.mockRequest.getParam('pageNum') || 1
var pageSize = fox.mockRequest.getParam('pageSize') || 10
// 参数名称
var name = fox.mockRequest.getParam('name') || ''
// 参数键名
var key = fox.mockRequest.getParam('key') || ''
// 系统内置
var type = fox.mockRequest.getParam('type') || ''
// 参数状态
var status = fox.mockRequest.getParam('status') || ''

// 过滤后的列表
var filterList = paramList

if (name || name === 0) {
  filterList = filterList.filter(item => item.name === name)
}
if (key || key === 0) {
  filterList = filterList.filter(item => item.key === key)
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

export default paramList