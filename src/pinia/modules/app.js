import { defineStore } from 'pinia'
import config from '@/config/config.js'
import { getStorage, setStorage } from '@/utils/storage.js'

const useAppStore = defineStore('App', {
  state: () => {
    return {
      // 配置数据
      configData: Object.assign(config, getStorage('QS_ADMIN_CONFIG')),
      // 打开的标签页数据
      tagPages: getStorage('QS_ADMIN_TAGPAGES') || []
    }
  },
  actions: {
    // 设置配置数据
    setConfigData(key, value) {
      this.configData[key] = value
      setStorage('QS_ADMIN_CONFIG', this.configData)
    },
    // 添加标签页
    addTagPage(item) {
      let isExist = this.tagPages.find(tag => tag.id === item.id && tag.name === item.name)
      if (!isExist) {
        this.tagPages.push(item)
        setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
      }
    },
    // 移除标签页
    removeTagPage(index) {
      this.tagPages.splice(index, 1)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭其他标签页
    closeOtherTagPage(item) {
      this.tagPages = []
      this.tagPages.push(item)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭全部标签页
    closeAllTagPage() {
      this.tagPages = []
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭左边标签页
    closeLeftTagPage(index) {
      this.tagPages.slice(0, index + 1)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭右边标签页
    closeRightTagPage(index) {
      this.tagPages.slice(index + 1)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    }
  },
  getters: {

  }
})

export default useAppStore