import router from './index.js'
import useUserStore from '@/pinia/modules/user.js'
import resolveRoutes from '@/utils/resolveRoutes.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

// 白名单页面
const whitePageList = ['/login']

// 全局前置守卫
router.beforeEach(async (to, from) => {
  NProgress.start()
  const userStore = useUserStore()
  // 存在用户信息
  if (userStore.token) {
    // // 判断是否存在用户信息
    // const existUserInfo = !!userStore.userInfo.id
    // // 有用户信息
    // if (existUserInfo) {
    //   // 去往登录页
    //   if (to.path === '/login') {
    //     return from
    //   }
    // }
    // // 没有用户信息
    // else if(!existUserInfo) {
    //   resolveRoutes(userStore.userInfo.routes)
    //   // 去往登录页
    //   if (to.path === '/login') {
    //     return { path: '/backstage/home' }
    //   }
    //   // 不是去往登录页
    //   else if (to.path !== '/login') {
    //     return { path: location.hash.slice(1) }
    //   }
    // }
  }
  // 不存在用户信息
  else if (!userStore.token) {
    // 不是白名单中的页面
    // if (whitePageList.indexOf(to.path) === -1) {
    //   return { path: `/login?redirect=${to.fullPath}` }
    // }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  NProgress.done()
})