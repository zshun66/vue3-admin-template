import { defineStore } from 'pinia'
import useAppStore from './app.js'
import useDictStore from './dict.js'
import useTagStore from './tag.js'
import { reqUserLogin, reqUserLogout } from '@/api/system/user.js'
import { getStorage, setStorage, removeStorage } from '@/utils/storage.js'
import resolveRoutes from '@/router/resolve.js'

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
      this.clearStore()
      return Promise.resolve(result.data)
    },
    // 清除数据
    clearStore() {
      this.userInfo = {}
      removeStorage('QS_ADMIN_USERINFO')
      useAppStore().clearStore()
      useDictStore().clearStore()
      useTagStore().clearStore()
    }
  },
  getters: {
    token: (state) => state.userInfo.token,
    avatar: (state) => state.userInfo.avatar,
    username: (state) => state.userInfo.username,
    nickname: (state) => state.userInfo.nickname,
    sex: (state) => state.userInfo.sex,
    phone: (state) => state.userInfo.phone,
    email: (state) => state.userInfo.email,
    menus: (state) => state.userInfo.menus,
    jump: (state) => state.userInfo.jump,
  }
})

export default useUserStore