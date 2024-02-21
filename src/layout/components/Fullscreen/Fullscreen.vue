<script setup name="Fullscreen">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

// 是否全屏
const isFullscreen = ref(false)

// 切换全屏
const toggleFullscreen = function () {
  if (!isFullscreen.value) {
    // 进入全屏
    const element = document.documentElement
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen()
    }
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen()
    }
  }
  isFullscreen.value = !isFullscreen.value
}

// 全屏状态变化时
const handleFullscreenChange = function () {
  // 检查是否处于全屏状态
  if (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  ) {
    isFullscreen.value = true
  } else {
    isFullscreen.value = false
  }
}

// 监听全屏状态变化事件
document.addEventListener('fullscreenchange', handleFullscreenChange)
document.addEventListener('mozfullscreenchange', handleFullscreenChange) // Firefox
document.addEventListener('webkitfullscreenchange', handleFullscreenChange) // Chrome, Safari, and Opera
document.addEventListener('msfullscreenchange', handleFullscreenChange) // IE/Edge

// 组件卸载前事件
onBeforeUnmount(() => {
  // 移除监听器以避免内存泄漏
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.removeEventListener('msfullscreenchange', handleFullscreenChange)
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
    fill: var(--theme-header-icon-color);
  }
}
</style>