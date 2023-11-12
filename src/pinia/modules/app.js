import { defineStore } from 'pinia'
import config from '@/config/config.js'
import { getStorage, setStorage } from '@/utils/storage.js'

const useAppStore = defineStore('App', {
  state: () => {
    return {
      // 配置数据
      configData: Object.assign(config, getStorage('ZS_ADMIN_CONFIG')),
    }
  },
  actions: {
    // 设置配置数据
    setConfigData(key, value) {
      this.configData[key] = value
      setStorage('ZS_ADMIN_CONFIG', this.configData)
    }
  },
  getters: {

  }
})

export default useAppStore