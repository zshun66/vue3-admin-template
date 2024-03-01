<script setup>
import { useI18n } from 'vue-i18n'
import useAppStore from '@/pinia/modules/app.js'
import zhCN from 'element-plus/dist/locale/zh-cn.mjs'
import zhTW from 'element-plus/dist/locale/zh-tw.mjs'
import enUS from 'element-plus/dist/locale/en.mjs'

const i18n = useI18n()
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

// 设置语言
const setLanguage = (function () {
  i18n.locale.value = appStore.lang
})()

// 设置主题
const setTheme = (function () {
  const htmlDom = document.querySelector('html')
  htmlDom.classList.remove('light')
  htmlDom.classList.remove('dark')
  htmlDom.classList.add(appStore.theme)
})()
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
