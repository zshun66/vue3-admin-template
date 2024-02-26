import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage } from '@/utils/storage.js'

const useTagStore = defineStore('Tag', {
  state: () => {
    return {
      // 打开的标签页数据
      tagPages: getStorage('QS_ADMIN_TAGPAGES') || []
    }
  },
  actions: {
    // 添加标签页
    addTagPage(item) {
      let isExist = this.tagPages.find(tag => tag.name === item.name)
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
      this.tagPages = this.tagPages.slice(index)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭右边标签页
    closeRightTagPage(index) {
      this.tagPages = this.tagPages.slice(0, index + 1)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 清除数据
    clearStore() {
      this.tagPages = []
      removeStorage('QS_ADMIN_TAGPAGES')
    }
  },
  getters: {

  }
})

export default useTagStore