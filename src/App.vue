<script setup>
import useAppStore from '@/pinia/modules/app.js'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import enUS from 'element-plus/dist/locale/en.mjs'

const appStore = useAppStore()

const locale = computed(() => {
  const lang = appStore.configData.lang
  if (lang === 'zh-CN') {
    return zhCn
  } else if (lang === 'zh-TW') {
    return zhTw
  } else if (lang === 'en-US') {
    return enUS
  }
})
</script>

<template>
  <el-config-provider
    :locale="locale"
    size="default"
    :z-index="3000"
  >
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss">
</style>
