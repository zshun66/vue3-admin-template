<script setup name="Toggle">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

// 菜单状态(shrink收缩、expand展开)
const menuStatus = ref('expand')

// 图标颜色
const iconColor = computed(() => {
  if (appStore.configData.theme === 'light') {
    return '#000000'
  } else if (appStore.configData.theme === 'dark') {
    return '#ffffff'
  }
})
</script>

<template>
  <div class="comp_container toggle_comp" :title="menuStatus === 'shrink' ? '展开菜单' : '收缩菜单'">
    <icon-menu-unfold-one theme="filled" size="28" :fill="iconColor" :strokeWidth="3" v-if="menuStatus === 'expand'" />
    <icon-menu-fold-one theme="filled" size="28" :fill="iconColor" :strokeWidth="3" v-if="menuStatus === 'shrink'" />
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