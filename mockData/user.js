import menuData from './menu.js'

/**
 * 用户信息
 * userId					  用户ID
 * avatar			      头像
 * nickname					昵称
 * username					用户名
 * password					密码
 * roles						所属角色列表
 * routes						拥有菜单列表
 * token						token凭证
 */

export default [
  {
    userId: 1,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '超级管理员',
    username: 'admin',
    password: '111111',
    roles: [],
    routes: menuData,
    token: 'Admin Token',
  },
  {
    userId: 2,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nickname: '系统管理员',
    username: 'system',
    password: '111111',
    roles: [],
    routes: [],
    token: 'System Token',
  },
]