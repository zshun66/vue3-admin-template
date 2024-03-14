<script setup name="Fullscreen">
import {
  requestFullscreen,
  exitFullscreen,
  checkFullscreen,
  addFullscreenChange,
  removeFullscreenChange
} from '@/utils/fullscreen.js'

// 是否全屏
const isFullscreen = ref(false)

// 切换全屏
const toggleFullscreen = function () {
  if (!isFullscreen.value) {
    requestFullscreen()
  } else {
    exitFullscreen()
  }
  isFullscreen.value = !isFullscreen.value
}

// 全屏状态改变时
const handleFullscreenChange = function () {
  isFullscreen.value = checkFullscreen()
}

// 监听全屏状态变化事件
addFullscreenChange(handleFullscreenChange)

// 组件卸载前事件
onBeforeUnmount(() => {
  // 移除监听器以避免内存泄漏
  removeFullscreenChange(handleFullscreenChange)
})
</script>

<template>
  <div
    class="comp_container fullscreen_comp"
    :title="isFullscreen ? '退出全屏' : '进入全屏'"
    @click="toggleFullscreen"
  >
    <svg-icon name="fullscreen1" size="20px" v-if="!isFullscreen"></svg-icon>
    <svg-icon name="exit-fullscreen1" size="20px" v-if="isFullscreen"></svg-icon>
  </div>
</template>

<style scoped lang="scss">
.fullscreen_comp {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;

  :deep(.svg-icon) {
    fill: var(--theme-navbar-icon-color);
  }
}
</style>