import roleData from './role.js'
import deptData from './dept.js'
import postData from './post.js'

// 超级管理员角色
const adminRole = JSON.parse(JSON.stringify(roleData)).find(item => item.id === '1')
const adminMenus = adminRole.menus
delete adminRole.menus
delete adminRole.menuIds
// 系统管理员角色
const systemRole = JSON.parse(JSON.stringify(roleData)).find(item => item.id === '2')
const systemMenus = systemRole.menus
delete systemRole.menus
delete systemRole.menuIds
// 业务员角色
const salesmanRole = JSON.parse(JSON.stringify(roleData)).find(item => item.id === '5')
const salesmanMenus = salesmanRole.menus
delete salesmanRole.menus
delete salesmanRole.menuIds

// 一级部门
const oneLevelDept = JSON.parse(JSON.stringify(deptData)).find(item => item.id === '1')
delete oneLevelDept.children
// 技术部门
const technologyDept = JSON.parse(JSON.stringify(deptData)).find(item => item.id === '1').children.find(item => item.id === '11')
delete technologyDept.children
// 商务部门
const businessDept = JSON.parse(JSON.stringify(deptData)).find(item => item.id === '1').children.find(item => item.id === '14')
delete businessDept.children


// 用户列表
const userListAll = [
  {
    id: '1',
    sort: 10,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '周大帅',
    username: 'admin',
    password: '111111',
    phone: '13755609011',
    email: '2436509528@qq.com',
    sex: '1',
    menus: adminMenus,
    roles: [adminRole],
    dept: oneLevelDept,
    post: postData.find(item => item.id === '1'),
    status: '1',
    remark: '我是周大帅',
    jump: '/backstage/home',
    token: 'Admin Token',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: '2',
    sort: 20,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '张三',
    username: 'zhangsan',
    password: '111111',
    phone: '13755609022',
    email: '2436509529@qq.com',
    sex: '0',
    menus: systemMenus,
    roles: [systemRole],
    dept: technologyDept,
    post: postData.find(item => item.id === '5'),
    status: '1',
    remark: '我是张三',
    jump: '/backstage/system/user',
    token: 'Zhangsan Token',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: '3',
    sort: 30,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '李四',
    username: 'lisi',
    password: '111111',
    phone: '13755609033',
    email: '2436509530@qq.com',
    sex: '0',
    menus: salesmanMenus,
    roles: [salesmanRole],
    dept: businessDept,
    post: postData.find(item => item.id === '3'),
    status: '1',
    remark: '我是李四',
    jump: '/backstage/dashboard/workbenches',
    token: 'Lisi Token',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: '4',
    sort: 40,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '王五',
    username: 'wangwu',
    password: '111111',
    phone: '13755609044',
    email: '2436509531@qq.com',
    sex: '0',
    menus: [...salesmanMenus, ...systemMenus],
    roles: [systemRole, salesmanRole],
    dept: businessDept,
    post: postData.find(item => item.id === '4'),
    status: '1',
    remark: '我是王五',
    jump: '/backstage/dashboard/workbenches',
    token: 'Wangwu Token',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
]

export default userListAll