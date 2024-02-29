<script setup>
import useAppStore from '@/pinia/modules/app.js'
import zhCN from 'element-plus/dist/locale/zh-cn.mjs'
import zhTW from 'element-plus/dist/locale/zh-tw.mjs'
import enUS from 'element-plus/dist/locale/en.mjs'

const appStore = useAppStore()

const locale = computed(() => {
  const lang = appStore.lang
  const langMap = {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS,
  }
  return langMap[lang]
})
</script>

<template>
  <el-config-provider
    :locale="locale"
    :size="appStore.size"
    :z-index="3000"
  >
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss">
</style>
