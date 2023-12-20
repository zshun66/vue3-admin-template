import { defineStore } from 'pinia'
import { reqLogin } from '@/api/system/user.js'
import { getStorage, setStorage } from '@/utils/storage.js'
import resolveRoutes from '@/utils/resolveRoutes.js'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      userInfo: getStorage('ZS_ADMIN_USERINFO') || {},
    }
  },
  actions: {
    // 处理用户登录
    async handleUserLogin(data) {
      const { result } = await reqLogin(data)
      if (!result) return Promise.reject()
      this.userInfo = result.data.userInfo || {}
      resolveRoutes(this.userInfo.routes || [])
      setStorage('ZS_ADMIN_USERINFO', this.userInfo)
      return Promise.resolve()
    },
  },
  getters: {
    token: (state) => {
      return state.userInfo.token || ''
    }
  }
})

export default useUserStore