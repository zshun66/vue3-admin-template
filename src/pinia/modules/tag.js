import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage } from '@/utils/storage.js'

const useTagStore = defineStore('Tag', {
  state: () => {
    return {
      // 标签页数据
      tagPages: getStorage('QS_ADMIN_TAGPAGES') || []
    }
  },
  actions: {
    // 添加标签页 - 根据标签页对象
    addTagPageByItem(item) {
      let isExist = this.tagPages.find(tag => tag.name === item.name)
      if (isExist) return
      this.tagPages.push(item)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 添加标签页 - 根据标签页索引
    addTagPageByIndex(item, index) {
      let isExist = this.tagPages.find(tag => tag.name === item.name)
      if (isExist) return
      this.tagPages.splice(index, 0, item)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 移除标签页 - 根据标签页对象
    removeTagPageByItem(item) {
      const index = this.tagPages.findIndex(tag => tag.name === item.name)
      this.tagPages.splice(index, 1)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 移除标签页 - 根据标签页索引
    removeTagPageByIndex(index) {
      this.tagPages.splice(index, 1)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭其他标签页 - 根据标签页对象
    closeOtherTagPageByItem(item) {
      this.tagPages = []
      this.tagPages.push(item)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭其他标签页 - 根据标签页索引
    closeOtherTagPageByIndex(index) {
      const item = this.tagPages[index]
      this.tagPages = []
      this.tagPages.push(item)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭左边标签页 - 根据标签页对象
    closeLeftTagPageByItem(item) {
      const index = this.tagPages.findIndex(tag => tag.name === item.name)
      this.tagPages = this.tagPages.slice(index)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭左边标签页 - 根据标签页索引
    closeLeftTagPageByIndex(index) {
      this.tagPages = this.tagPages.slice(index)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭右边标签页 - 根据标签页对象
    closeRightTagPageByItem(item) {
      const index = this.tagPages.findIndex(tag => tag.name === item.name)
      this.tagPages = this.tagPages.slice(0, index + 1)
      setStorage('QS_ADMIN_TAGPAGES', this.tagPages)
    },
    // 关闭右边标签页 - 根据标签页索引
    closeRightTagPageByIndex(index) {
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