/**
 * 角色项信息
 * roleId						角色ID
 * name						  角色名称
 * perms						权限字符
 * sort					    角色排序
 * status						角色状态
 * menus            角色拥有的菜单
 */

export default [
  {
    roleId: 1,
    name: '超级管理员',
    perms: 'super:administrator',
    sort: 1,
    status: '1',
    menus: [],
  },
  {
    roleId: 2,
    name: '系统管理员',
    perms: 'system:administrator',
    sort: 2,
    status: '1',
    menus: [],
  },
  {
    roleId: 3,
    name: '普通用户',
    perms: 'ordinary:user',
    sort: 3,
    status: '1',
    menus: [],
  },
]