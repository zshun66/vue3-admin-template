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
 * @param {Array} routes 路由数组
 */
const resolveRoutes = (routes) => {
  routes.forEach(route => {
    if (route.type === 'button') return
    const isChildren = route.children && route.children.length > 0
    const routeObj = {
      path: route.path,
      name: route.name,
      component: resolveComponent(route.component),
      redirect: (route.type === 'directory' && isChildren) ? '/backstage/' + route.children[0].path : undefined,
      meta: {
        title: route.title,
        icon: route.icon,
        isLink: route.isLink,
        isCache: route.isCache,
        isVisible: route.isVisible,
        isClearable: route.isClearable
      }
    }
    router.addRoute('backstage', routeObj)
    if (isChildren) resolveRoutes(route.children)
  })
}

export default resolveRoutes