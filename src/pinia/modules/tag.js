import { defineStore } from 'pinia'
import router from '@/router/index.js'
import { getStorage, setStorage, removeStorage } from '@/utils/storage.js'

const useTagStore = defineStore('Tag', {
  state: () => {
    return {
      // 标签页数据
      tagPages: getStorage('QS_ADMIN_TAGPAGES') || []
    }
  },
  actions: {
    // 添加标签页
    addTagPage(item) {
      let isExist = this.tagPages.find(tag => tag.name === item.name)
      if (isExist) return
      this.tagPages.push(item)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 移除标签页
    removeTagPage(index) {
      const item = this.tagPages[index]
      const currRouteName = router.currentRoute.value.name
      if (item.name === currRouteName) {
        if (index === 0 && this.tagPages.length >= 2) {
          router.push(this.tagPages[index + 1].path)
        } else if (index > 0) {
          router.push(this.tagPages[index - 1].path)
        }
      }
      this.tagPages.splice(index, 1)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭其他标签页
    closeOtherTagPage(index) {
      const item = this.tagPages[index]
      this.tagPages = []
      this.tagPages.push(item)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
      const currRouteName = router.currentRoute.value.name
      if (item.name !== currRouteName) {
        router.push(item.path)
      }
    },
    // 关闭左侧标签页
    closeLeftTagPage(index) {
      this.tagPages = this.tagPages.slice(index)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭右侧标签页
    closeRightTagPage(index) {
      this.tagPages = this.tagPages.slice(0, index + 1)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭全部标签页
    closeAllTagPage() {
      this.tagPages = []
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 清除数据
    clearStore() {
      this.tagPages = []
      removeStorage('QS_ADMIN_TAGPAGES')
    }
  },
  getters: {
    // 加入缓存的名称列表
    cacheNames: (state) => {
      const result = []
      state.tagPages.forEach(item => {
        if (item.isCache === '1') {
          result.push(item.name)
        }
      })
      return result
    }
  }
})

export default useTagStore