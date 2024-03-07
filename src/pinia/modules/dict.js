import { defineStore } from 'pinia'

const useDictStore = defineStore('Dict', {
  state: () => {
    return {
      // 字典数据
      dictMap: {}
    }
  },
  actions: {
    // 获取字典
    getDict(dictType) {
      if (!dictType) return
      return this.dictMap[dictType]
    },
    // 设置字典
    setDict(dictType, data) {
      if (!dictType) return
      this.dictMap[dictType] = data
    },
    // 删除字典
    deleteDict(dictType) {
      if (!dictType) return
      delete this.dictMap[dictType]
    },
    // 清空字典
    cleanDict() {
      this.dictMap = {}
    },
    // 清除数据
    clearStore() {
      this.dictMap = {}
    }
  },
  getters: {
    
  }
})

export default useDictStore