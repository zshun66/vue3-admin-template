/**
 * 提取树形数据指定的键名集合
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