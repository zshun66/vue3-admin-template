import menuData from './menu.js'
import roleData from './role.js'
import deptData from './dept.js'
import postData from './post.js'

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
    menus: menuData,
    roles: [roleData.find(item => item.id === '1')],
    dept: deptData.find(item => item.id === '1'),
    post: postData.find(item => item.id === '1'),
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
    menus: menuData.filter(item => item.id === '99' || item.id === '1'),
    roles: [roleData.find(item => item.id === '2')],
    dept: deptData.find(item => item.id === '1').children.find(item => item.id === '11'),
    post: postData.find(item => item.id === '5'),
    status: '1',
    remark: '我是法外狂徒',
    token: 'Developer Token',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
]

export default userListAll