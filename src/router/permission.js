import router from './index.js'
import useUserStore from '@/pinia/modules/user.js'

// 全局前置守卫
router.beforeEach((to, from) => {
  const userStore = useUserStore()
  userStore.getUserInfo()
})

// 全局后置守卫
router.afterEach((to, from) => {

})