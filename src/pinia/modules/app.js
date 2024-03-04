import { defineStore } from 'pinia'
import appConfig from '@/config/appConfig.js'
import { getStorage, setStorage } from '@/utils/storage.js'

const useAppStore = defineStore('App', {
  state: () => {
    return {
      // 应用配置
      appConfig: Object.assign(appConfig, getStorage('QS_ADMIN_APPCONFIG')),
    }
  },
  actions: {
    // 设置配置数据
    setConfigData(key, value) {
      this.appConfig[key].value = value
      const appConfigCopy = {}
      for (const key in this.appConfig) {
        if (this.appConfig[key].storage) {
          appConfigCopy[key] = this.appConfig[key]
        }
      }
      setStorage('QS_ADMIN_APPCONFIG', appConfigCopy)
    },
    // 清除数据
    clearStore() {
    }
  },
  getters: {
    collapse: (state) => state.appConfig.collapse.value,
    accordion: (state) => state.appConfig.accordion.value,
    theme: (state) => state.appConfig.theme.value,
    lang: (state) => state.appConfig.lang.value,
    size: (state) => state.appConfig.size.value,
    pageTranstion: (state) => state.appConfig.pageTranstion.value,
  }
})

export default useAppStore