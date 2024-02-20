/**
 * 提取树形数据中的指定的键名集合
 * @param {Array} treeData 树形数据
 * @param {String} targetKeyName 被提取的目标键名
 * @param {childrenKeyName} childrenKeyName 子数据键名
 */
export function extractKeyNamesFromTree(
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

/**
 * 提取树形数据中的面包屑数组
 * @param {Array} treeData 树形数据
 * @param {String} targetKeyName 被提取的目标键名
 * @param {Array} resultKeys 提取出来的数组中的键名
 */
export function extractBreadcrumbsFromTree(
  treeData,
  targetKeyName,
  resultKeys = [],
  breadcrumbs = []
) {
  if (!Array.isArray(treeData)) return []
  if (!targetKeyName) return []
  for (let item of treeData) {
    const obj = {}
    resultKeys.forEach(key => {
      obj[key] = item[key]
    })
    if (item.path === targetKeyName) {
      breadcrumbs.push(obj)
      return breadcrumbs
    }
    if (item.children) {
      const result = extractBreadcrumbsFromTree(
        item.children,
        targetKeyName,
        resultKeys,
        [...breadcrumbs, obj]
      )
      if (result) return result
    }
  }
  return null
}