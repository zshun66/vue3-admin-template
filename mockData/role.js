import menuData from './menu.js'

/**
 * 角色项信息
 * id						    角色ID
 * sort					    角色排序
 * name						  角色名称
 * perms						权限字符
 * status						角色状态
 * menus            角色拥有的菜单
 */

export default [
  {
    id: 1,
    sort: 10,
    name: '超级管理员',
    perms: 'administrator',
    status: '1',
    menus: menuData,
  },
  {
    id: 2,
    sort: 20,
    name: '开发者',
    perms: 'developer',
    status: '1',
    menus: menuData.filter(item => item.id === 99 || item.id === 1),
  },
]