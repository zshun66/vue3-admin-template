<script setup name="Maximize">
const $props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const $emits = defineEmits(['update:show'])

// 进入最大化
const handleEnterMaximize = () => {
  const asideDom = document.querySelector('aside.el-aside.layout_aside')
  const headerDom = document.querySelector('header.el-header.layout_header')
  asideDom.style.display = 'none'
  headerDom.style.display = 'none'
}

// 退出最大化
const handleExitMaximize = () => {
  const asideDom = document.querySelector('aside.el-aside.layout_aside')
  const headerDom = document.querySelector('header.el-header.layout_header')
  asideDom.style.display = 'block'
  headerDom.style.display = 'block'
}

// 关闭
const handleClose = () => {
  $emits('update:show', false)
}

watch(() => $props.show, (newv, oldv) => {
  if (newv) handleEnterMaximize()
  else handleExitMaximize()
})
</script>

<template>
  <div class="comp_container maximize_comp">
    <teleport to="body">
      <div id="exit_maximize_box" title="退出最大化" @click="handleClose" v-if="show">
        <svg-icon class="exit_icon" name="exit1" size="19px"></svg-icon>
      </div>
    </teleport>
  </div>
</template>

<style scoped lang="scss">
.maximize_comp {
  width: 0;
  height: 0;
}
</style>

<style lang="scss">
#exit_maximize_box {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  position: fixed;
  top: -25px;
  right: -25px;
  z-index: 99999;
  background: #909399;
  opacity: 0.9;
  cursor: pointer;

  &:hover {
    background-color: #73767a;
  }

  .exit_icon {
    position: relative;
    top: 52%;
    left: 15%;
    font-size: 14px;
    fill: #ffffff;
    transform: rotate(180deg);
  }
}
</style>