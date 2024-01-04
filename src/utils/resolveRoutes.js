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
    const isChildren = menu.children && menu.children.length > 0
    const redirect = (menu.type === 'directory' && isChildren) ? `/backstage/${menu.children[0].path}` : undefined
    const routeObj = {
      path: menu.path,
      name: menu.name,
      component: resolveComponent(menu.component),
      redirect: redirect,
      meta: {
        title: menu.title,
        icon: menu.icon,
        iconSize: menu.iconSize,
        isLink: menu.isLink,
        isCache: menu.isCache,
        isVisible: menu.isVisible,
        isClearable: menu.isClearable
      }
    }
    router.addRoute('backstage', routeObj)
    if (isChildren) resolveRoutes(menu.children)
  })
}

export default resolveRoutes