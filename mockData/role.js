import menuData from './menu.js'
import { extractKeyNamesFromTree } from '@/utils/utils.js'

/**
 * 角色项信息
 * id						    角色ID
 * sort					    角色排序
 * name						  角色名称
 * perms						权限字符
 * status						角色状态
 * menus            角色拥有的菜单
 * menuIds          角色拥有的菜单id集合
 * remark           备注
 * creator          创建者
 * createTime       创建时间
 */

export default [
  {
    id: 1,
    sort: 10,
    name: '超级管理员',
    perms: 'administrator',
    status: '1',
    menus: menuData,
    menuIds: extractKeyNamesFromTree(menuData, 'id'),
    remark: '拥有所有权限',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: 2,
    sort: 20,
    name: '开发者',
    perms: 'developer',
    status: '1',
    menus: menuData.filter(item => item.id === 99 || item.id === 1),
    menuIds: extractKeyNamesFromTree(menuData.filter(item => item.id === 99 || item.id === 1), 'id'),
    remark: '拥有部分权限',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
]