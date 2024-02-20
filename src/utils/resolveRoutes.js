import router from '@/router/index.js'

const modules = import.meta.glob('../views/backstage-pages/**/*.vue')

/**
 * 解析组件
 * @param {String} componentPath 组件路径
 */
const resolveComponent = (componentPath) => {
  if (!componentPath) return componentPath
  const compFullPath = `../views/${componentPath}.vue`
  return modules[compFullPath]
}

/**
 * 解析路由
 * @param {Array} menus 菜单数组
 */
const resolveRoutes = (menus) => {
  menus.forEach(menu => {
    if (menu.type === 'button') return
    const hasChildren = menu.children && menu.children.length > 0
    let redirect = undefined
    if (hasChildren && menu.type === 'directory') {
      redirect = `${menu.children[0].path}`
    }
    const routeObj = {
      path: menu.path,
      name: menu.name,
      component: resolveComponent(menu.component),
      redirect: redirect,
      meta: {
        title: menu.title,
      }
    }
    router.addRoute('backstage', routeObj)
    if (hasChildren) resolveRoutes(menu.children)
  })
}

export default resolveRoutes