import menuData from '../mock_data/menu.js'

function extractKeyNamesFromTree(
  treeData,
  targetKeyName,
  childrenKeyName = 'children'
) {
  if (!Array.isArray(treeData)) return []
  if (!targetKeyName) return []
  const keyNames = []
  function traverse(list) {
    for (const node of list) {
      if (node[targetKeyName]) {
        keyNames.push(node[targetKeyName])
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

// 角色列表
const roleListAll = [
  {
    id: '1',
    sort: 10,
    name: '超级管理员',
    perms: 'administrator',
    status: '1',
    menuIds: extractKeyNamesFromTree(menuData, 'id', 'children'),
    remark: '拥有所有权限',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
  {
    id: '2',
    sort: 20,
    name: '开发者',
    perms: 'developer',
    status: '1',
    menuIds: ['99', '1', '11', '12', '13'],
    remark: '拥有部分权限',
    creator: '超级管理员',
    createTime: '2023-11-15 11:43:23'
  },
]

export default roleListAll