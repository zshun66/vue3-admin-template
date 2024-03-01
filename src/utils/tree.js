/**
 * 提取树形数据中的指定的键名集合
 * @param {Array} data 树形数据
 * @param {String} targetKey 被提取的目标键名
 * @param {childKey} childKey 子数据键名
 */
export function extractKeyNamesFromTree(
  data,
  targetKey,
  childKey = 'children'
) {
  if (!Array.isArray(data)) return []
  if (!targetKey) return []
  const keyNames = []
  function traverse(list) {
    for (const node of list) {
      if (node[targetKey]) {
        keyNames.push(node[targetKey])
      }
      if (
        Array.isArray(node[childKey]) &&
        node[childKey].length > 0
      ) {
        traverse(node[childKey])
      }
    }
  }
  traverse(data)
  return keyNames
}

/**
 * 提取树形数据中的面包屑数组
 * @param {Object} options 参数选项
 */
export function extractBreadcrumbsFromTree(options, breadcrumbs = []) {
  const {
    data = [],
    target = '',
    extractKeys = [],
    childKey = 'children'
  } = options
  if (!Array.isArray(data)) return []
  if (!target) return []
  for (let item of data) {
    const obj = {}
    extractKeys.forEach(key => obj[key] = item[key])
    if (item.path === target) {
      breadcrumbs.push(obj)
      return breadcrumbs
    }
    if (item[childKey]) {
      const opts = { ...options }
      opts.data = item[childKey]
      const result = extractBreadcrumbsFromTree(opts, [...breadcrumbs, obj])
      if (result) return result
    }
  }
  return null
}

/**
 * 根据关键词模糊搜索提取出路径数组
 * @param {Object} options 参数选项
 */
export function extractPathsFromTree(options = {}, currPath = '') {
  const {
    data = [],
    keyword = '',
    extractKeys = [],
    separator = '>',
    targetKey = 'title',
    childKey = 'children'
  } = options
  if (!Array.isArray(data)) return []
  if (!keyword) return []
  if (!targetKey) return []
  const results = []
  for (const item of data) {
    const path = currPath ? `${currPath} ${separator} ${item[targetKey]}` : item[targetKey]
    if (item[targetKey] && item[targetKey].includes(keyword)) {
      const obj = {}
      extractKeys.forEach(key => obj[key] = item[key])
      obj.value = path
      results.push(obj)
    }
    if (item[childKey]) {
      const opts = { ...options }
      opts.data = item[childKey]
      const childResults = extractPathsFromTree(opts, path)
      results.push(...childResults)
    }
  }
  return results
}

/**
 * 根据字段值判断是否在树形数据中存在
 * @param {Object} options 参数选项
 */
export function findFieldValueInTree(options = {}) {
  const {
    data = [],
    targetKey = '',
    targetValue = '',
    childKey = 'children'
  } = options
  if (!Array.isArray(data)) return false
  if (!targetKey) return false
  if (!targetValue) return false
  function traverseChildren(node) {
    if (node[childKey]) {
      for (const child of node[childKey]) {
        if (child[targetKey] === targetValue) {
          return true
        }
        if (traverseChildren(child)) {
          return true
        }
      }
    }
    return false
  }
  for (const node of data) {  
    if (node[targetKey] === targetValue) {  
      return true
    }  
    if (traverseChildren(node)) {  
      return true
    }  
  }  
  return false
}