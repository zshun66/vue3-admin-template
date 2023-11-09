<script setup name="SidebarItem">
const $router = useRouter()
const $props = defineProps({
  menus: {
    type: Array,
    default: () => ([])
  }
})

// 点击MenuItem
const onClickMenuItem = function(e, menu) {
  // 非外链菜单
  if (menu.isLink === '0') {
    $router.push(`/backstage/${menu.path}`)
  }
  // 外链菜单
  else if (menu.isLink === '1') {
    // TODO
  }
}
</script>

<template>
  <template v-for="(menu, index) in menus" :key="index">
    <template v-if="menu.children && menu.children.length > 0">
      <el-sub-menu popper-class="menu_submenu_popper" :index="menu.path" :title="menu.title">
        <template #title>
          <svg-icon :name="menu.icon" :size="menu.iconSize"></svg-icon>
          <span>{{ menu.title }}</span>
        </template>
        <SidebarItem :menus="menu.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="menu.path" :title="menu.title" @click="onClickMenuItem($event, menu)">
        <template #title>
          <svg-icon :name="menu.icon" :size="menu.iconSize"></svg-icon>
          <span>{{ menu.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<style lang="scss">

</style>