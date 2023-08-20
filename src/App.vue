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
    <div>
      9999
      <el-date-picker type="date">
      </el-date-picker>
    </div>
  </el-config-provider>
</template>

<style scoped>

</style>
