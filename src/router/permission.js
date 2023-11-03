import router from './index.js'
import useUserStore from '@/pinia/modules/user.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/token.js'

NProgress.configure({ showSpinner: false })

console.log(window.location.href)

// 白名单页面
const whitePageList = ['/login']

// 全局前置守卫
router.beforeEach(async (to, from) => {
  console.log(to, from)
  NProgress.start()
  // 有token(已登录的情况)
  if (getToken()) {
    const userStore = useUserStore()
    // 判断是否存在用户信息
    const existUserInfo = !!userStore.userInfo.id
    // 去往登录页 并且 有用户信息
    if (to.path === '/login' && existUserInfo) {
      return from
    }
    // 没有用户信息
    else if (!existUserInfo) {
      console.log(777, to.path, from.path)
      await userStore.getUserInfo()
      return { path: '/backstage' }
    }
  }
  // 无token(未登录的情况)
  else {
    if (whitePageList.indexOf(to.path) === -1) {
      return {
        path: `/login?redirect=${to.fullPath}`
      }
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  NProgress.done()
})