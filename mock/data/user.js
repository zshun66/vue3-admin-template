// 用户列表
const userListAll = [
  {
    id: '1',
    sort: 10,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '周大帅-超级管理员',
    username: 'admin',
    password: '111111',
    phone: '13755609011',
    email: '2436509528@qq.com',
    sex: '1',
    menus: [],
    roles: [
      {
        id: '1',
        name: '超级管理员',
        perms: 'administrator',
      },
    ],
    dept: {
      id: '1',
      name: '江西天顺软件有限公司',
      head: '周总',
      telephone: '13755609011',
      email: 'jxtsrjyxgs@163.com',
    },
    post: {
      id: '1',
      name: '董事长',
      code: 'DSZ',
    },
    status: '1',
    remark: '我是周大帅',
    token: 'Admin Token',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: '2',
    sort: 20,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '法外狂徒-开发者',
    username: 'developer',
    password: '111111',
    phone: '13755609022',
    email: '2436509529@qq.com',
    sex: '0',
    menus: [],
    roles: [
      {
        id: '2',
        name: '开发者',
        perms: 'developer',
      },
    ],
    dept: {
      id: '11',
      name: '技术部',
      head: '邹总',
      telephone: '13755609022',
      email: 'jxtsrjyxgsjsb@163.com',
    },
    post: {
      id: '5',
      name: '前端开发工程师',
      code: 'QDKFGCS',
    },
    status: '1',
    remark: '我是法外狂徒',
    token: 'Developer Token',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
]

export default userListAll