import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/system/user.js'
import { getToken, setToken } from '@/utils/token.js'
import resolveRoutes from '@/utils/resolveRoutes.js'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      userInfo: {},
      token: getToken()
    }
  },
  actions: {
    // 处理用户登录
    async handleUserLogin(data) {
      const { result } = await reqLogin(data)
      if (!result) return Promise.reject()
      this.token = result.data.token
      setToken(this.token)
      this.getUserInfo()
      return Promise.resolve()
    },
    // 获取用户信息
    async getUserInfo() {
      const { result } = await reqUserInfo()
      if (!result) return Promise.reject()
      this.userInfo = result.data.userInfo
      resolveRoutes(this.userInfo.routes || [])
      return Promise.resolve()
    },
  },
  getters: {

  }
})

export default useUserStore