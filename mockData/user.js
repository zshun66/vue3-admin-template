import roleData from './role.js'

/**
 * 用户信息
 * id					      用户ID
 * sort             用户排序
 * avatar			      头像
 * nickname					昵称
 * username					用户名
 * password					密码
 * roles						所属角色列表
 * routes						拥有菜单列表
 * token						token凭证
 */

const adminRole = roleData.find(item => item.id === 1)
const developerRole = roleData.find(item => item.id === 2)

export default [
  {
    id: 1,
    sort: 10,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '周大帅-超级管理员',
    username: 'admin',
    password: '111111',
    roles: [adminRole],
    routes: adminRole.menus,
    token: 'Admin Token',
  },
  {
    id: 2,
    sort: 20,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '法外狂徒-开发者',
    username: 'developer',
    password: '111111',
    roles: [developerRole],
    routes: developerRole.menus,
    token: 'Developer Token',
  },
]