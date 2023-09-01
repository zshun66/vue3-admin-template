<script setup name="Toggle">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

// 菜单状态
const menuStatus = ref(appStore.configData.menuStatus)

// 设置菜单状态
const setMenuStatus = function (status) {

}

// 切换菜单状态
const toggleMenuStatus = function () {
  if (menuStatus.value === 'shrink') {
    menuStatus.value = 'expand'
  } else if (menuStatus.value === 'expand') {
    menuStatus.value = 'shrink'
  }
  setMenuStatus(menuStatus.value)
  appStore.setConfigData('menuStatus', menuStatus.value)
}

// 进入页面就设置默认菜单状态
setMenuStatus(menuStatus.value)
</script>

<template>
  <div class="comp_container toggle_comp" :title="menuStatus === 'shrink' ? '展开菜单' : '收缩菜单'" @click="toggleMenuStatus">
    <template v-if="appStore.configData.theme === 'light'">
      <icon-menu-unfold-one :class="menuStatus" theme="filled" size="28" fill="#505050" :strokeWidth="3"/>
    </template>
    <template v-if="appStore.configData.theme === 'dark'">
      <icon-menu-unfold-one :class="menuStatus" theme="filled" size="28" fill="#cccccc" :strokeWidth="3"/>
    </template>
  </div>
</template>

<style scoped lang="scss">
.toggle_comp {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 10px;
  cursor: pointer;

  .shrink {
    transform: rotate(180deg);
    transform-origin: center center;
    transition: all 0.3s;
  }

  .expand {
    transform: rotate(0deg);
    transform-origin: center center;
    transition: all 0.3s;
  }
}
</style>