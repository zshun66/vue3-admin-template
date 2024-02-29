<script setup name="Toggle">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

// 菜单状态
const collapse = ref(appStore.collapse)

// 切换菜单状态
const toggleCollapse = function () {
  collapse.value = !collapse.value
  appStore.setConfigData('collapse', collapse.value)
}
</script>

<template>
  <div
    class="comp_container toggle_comp"
    :title="collapse ? '展开菜单' : '收缩菜单'"
    @click="toggleCollapse"
  >
    <svg-icon name="menu-unfold1" size="24px" v-if="!collapse"></svg-icon>
    <svg-icon name="menu-fold1" size="24px" v-if="collapse"></svg-icon>
  </div>
</template>

<style scoped lang="scss">
.toggle_comp {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 10px;
  cursor: pointer;

  :deep(.svg-icon) {
    fill: var(--theme-navbar-icon-color);
  }
}
</style>