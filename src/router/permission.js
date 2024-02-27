import router from './index.js'
import useUserStore from '@/pinia/modules/user.js'
import resolveRoutes from '@/utils/resolveRoutes.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

// 是否处理过路由
let isResolveRoutes = false
// 白名单页面
const whitePageList = ['/login']

// 全局前置守卫
router.beforeEach(async (to, from) => {
  NProgress.start()
  const userStore = useUserStore()
  // console.log('from:', from.path)
  // console.log('to:', to.path)
  // 存在用户信息
  if (userStore.token) {
    if (!isResolveRoutes) {
      resolveRoutes(userStore.menus)
      isResolveRoutes = true
    }

    if (from.path === '/' && to.path === '/login') {
      return { path: '/backstage/home' }
    }

    if (from.path === '/' && to.path === '/404') {
      return { path: location.hash.slice(1) }
    }

    if (from.path !== '/' && to.path === '/login') {
      return false
    }
  }
  // 不存在用户信息
  else if (!userStore.token) {
    // 不是白名单中的页面
    if (whitePageList.indexOf(to.path) === -1) {
      return { path: `/login?redirect=${to.fullPath}` }
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  NProgress.done()
})