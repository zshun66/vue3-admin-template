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

export default paramList