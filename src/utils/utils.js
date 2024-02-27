/**
 * 提取树形数据中的指定的键名集合
 * @param {Array} data 树形数据
 * @param {String} targetKeyName 被提取的目标键名
 * @param {childKeyName} childKeyName 子数据键名
 */
export function extractKeyNamesFromTree(
  data,
  targetKeyName,
  childKeyName = 'children'
) {
  if (!Array.isArray(data)) return []
  if (!targetKeyName) return []
  const keyNames = []
  function traverse(list) {
    for (const node of list) {
      if (node[targetKeyName]) {
        keyNames.push(node[targetKeyName])
      }
      if (
        Array.isArray(node[childKeyName]) &&
        node[childKeyName].length > 0
      ) {
        traverse(node[childKeyName])
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
    childKeyName = 'children'
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
    if (item[childKeyName]) {
      const opts = { ...options }
      opts.data = item[childKeyName]
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
    targetKeyName = 'title',
    childKeyName = 'children'
  } = options
  if (!Array.isArray(data)) return []
  if (!keyword) return []
  if (!targetKeyName) return []
  const results = []
  for (const item of data) {
    const path = currPath ? `${currPath} ${separator} ${item[targetKeyName]}` : item[targetKeyName]
    if (item[targetKeyName] && item[targetKeyName].includes(keyword)) {
      const obj = {}
      extractKeys.forEach(key => obj[key] = item[key])
      obj.value = path
      results.push(obj)
    }
    if (item[childKeyName]) {
      const opts = { ...options }
      opts.data = item[childKeyName]
      const childResults = extractPathsFromTree(opts, path)
      results.push(...childResults)
    }
  }
  return results
}