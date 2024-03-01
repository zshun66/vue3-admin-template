import menuData from '../mock_data/menu.js'

function extractKeyNamesFromTree(
  treeData,
  targetKey,
  childrenKeyName = 'children'
) {
  if (!Array.isArray(treeData)) return []
  if (!targetKey) return []
  const keyNames = []
  function traverse(list) {
    for (const node of list) {
      if (node[targetKey]) {
        keyNames.push(node[targetKey])
      }
      if (
        Array.isArray(node[childrenKeyName]) &&
        node[childrenKeyName].length > 0
      ) {
        traverse(node[childrenKeyName])
      }
    }
  }
  traverse(treeData)
  return keyNames
}

// 超级管理员
let adminMenus = menuData // 全部菜单
let adminMenuIds = extractKeyNamesFromTree(adminMenus, 'id', 'children')

// 系统管理员
let systemMenus = menuData.filter(item => item.id === '2') // 只有“系统管理”模块菜单
let systemMenuIds = extractKeyNamesFromTree(systemMenus, 'id', 'children')

// 开发者
let developerMenus = menuData // 全部菜单
let developerMenuIds = extractKeyNamesFromTree(developerMenus, 'id', 'children')

// 测试员
let testerMenus = menuData // 全部菜单
let testerMenuIds = extractKeyNamesFromTree(testerMenus, 'id', 'children')

// 业务员
let salesmanMenus = menuData.filter(item => item.id === '1') // 全部菜单
let salesmanMenuIds = extractKeyNamesFromTree(salesmanMenus, 'id', 'children') // 只有“控制台”模块菜单

// 角色列表
const roleListAll = [
  {
    id: '1',
    sort: 10,
    name: '超级管理员',
    perms: 'administrator',
    status: '1',
    menus: adminMenus,
    menuIds: adminMenuIds,
    remark: '拥有所有权限',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: '2',
    sort: 20,
    name: '系统管理员',
    perms: 'system',
    status: '1',
    menus: systemMenus,
    menuIds: systemMenuIds,
    remark: '拥有部分权限',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: '3',
    sort: 30,
    name: '开发者',
    perms: 'developer',
    status: '1',
    menus: developerMenus,
    menuIds: developerMenuIds,
    remark: '拥有所有权限',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: '4',
    sort: 40,
    name: '测试员',
    perms: 'tester',
    status: '1',
    menus: testerMenus,
    menuIds: testerMenuIds,
    remark: '拥有所有权限',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: '5',
    sort: 50,
    name: '业务员',
    perms: 'salesman',
    status: '0',
    menus: salesmanMenus,
    menuIds: salesmanMenuIds,
    remark: '拥有部分权限',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
]

export default roleListAll