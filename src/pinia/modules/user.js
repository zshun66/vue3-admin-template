import { defineStore } from 'pinia'
import { reqUserLogin, reqUserLogout } from '@/api/system/user.js'
import { getStorage, setStorage, removeStorage } from '@/utils/storage.js'
import resolveRoutes from '@/utils/resolveRoutes.js'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      userInfo: getStorage('QS_ADMIN_USERINFO') || {},
    }
  },
  actions: {
    // 处理用户登录
    async handleUserLogin(data) {
      const { result } = await reqUserLogin(data)
      if (!result) return Promise.reject()
      this.userInfo = result.data || {}
      resolveRoutes(this.userInfo.menus || [])
      setStorage('QS_ADMIN_USERINFO', this.userInfo)
      return Promise.resolve(this.userInfo)
    },
    // 处理退出登录
    async handleUserLogout() {
      const { result } = await reqUserLogout()
      if (!result) return Promise.reject()
      this.userInfo = {}
      removeStorage('QS_ADMIN_USERINFO')
      return Promise.resolve(result.data)
    }
  },
  getters: {
    token: (state) => {
      return state.userInfo.token || ''
    }
  }
})

export default useUserStore