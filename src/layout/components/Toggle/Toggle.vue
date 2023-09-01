<script setup name="Toggle">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

// 菜单状态
const collapse = ref(appStore.configData.collapse)

// 设置菜单状态
const setcollapse = function (status) {

}

// 切换菜单状态
const togglecollapse = function () {
  if (collapse.value === 1) {
    collapse.value = 0
  } else if (collapse.value === 0) {
    collapse.value = 1
  }
  setcollapse(collapse.value)
  appStore.setConfigData('collapse', collapse.value)
}

// 进入页面就设置默认菜单折叠状态
setcollapse(collapse.value)
</script>

<template>
  <div class="comp_container toggle_comp" :title="collapse === 1 ? '展开菜单' : '收缩菜单'" @click="togglecollapse">
    <template v-if="appStore.configData.theme === 'light'">
      <icon-menu-unfold-one theme="filled" size="28" fill="#505050" :strokeWidth="3" v-if="collapse === 0"/>
      <icon-menu-fold-one theme="filled" size="28" fill="#505050" :strokeWidth="3" v-if="collapse === 1"/>
    </template>
    <template v-if="appStore.configData.theme === 'dark'">
      <icon-menu-unfold-one theme="filled" size="28" fill="#cccccc" :strokeWidth="3" v-if="collapse === 0"/>
      <icon-menu-fold-one theme="filled" size="28" fill="#505050" :strokeWidth="3" v-if="collapse === 1"/>
    </template>
  </div>
</template>

<style scoped lang="scss">
.toggle_comp {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 10px;
  cursor: pointer;
}
</style>