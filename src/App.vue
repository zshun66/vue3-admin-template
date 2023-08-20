<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const elGlobalConfig = reactive({
  locale: zhCn,
  size: 'default',
  zIndex: 3000
})
</script>

<template>
  <el-config-provider
    :locale="elGlobalConfig.locale"
    :size="elGlobalConfig.size"
    :z-index="elGlobalConfig.zIndex"
  >
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss">

</style>
