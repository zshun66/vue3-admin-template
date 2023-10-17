import router from './index.js'
import useUserStore from '@/pinia/modules/user.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/token.js'

NProgress.configure({ showSpinner: false })

const whitePageList = ['/login']

// 全局前置守卫
router.beforeEach(async (to, from) => {
  NProgress.start()
  if (getToken()) {
    // const userStore = useUserStore()
    // await userStore.getUserInfo()
  } else {
    if (whiteList.indexOf(to.path) === -1) {
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