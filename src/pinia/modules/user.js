import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user.js'
import { getToken, setToken } from '@/utils/token.js'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: getToken()
    }
  },
  actions: {
    // 处理用户登录
    async handleUserLogin(data) {
      const { result } = await reqLogin(data)
      if (result) {
        this.token = result.data.token
        setToken(this.token)
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    }
  },
  getters: {

  }
})

export default useUserStore