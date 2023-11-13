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
      <el-sub-menu popper-class="menu_submenu_popper" :index="menu.name" :title="menu.title">
        <template #title>
          <div class="menu_icon_box">
            <svg-icon :name="menu.icon" :size="menu.iconSize"></svg-icon>
          </div>
          <span>{{ menu.title }}</span>
        </template>
        <SidebarItem :menus="menu.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="menu.name" :title="menu.title" @click="onClickMenuItem($event, menu)">
        <div class="menu_icon_box">
          <svg-icon :name="menu.icon" :size="menu.iconSize"></svg-icon>
        </div>
        <template #title>
          <span>{{ menu.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<style scoped lang="scss">
.menu_icon_box {
  width: 20px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss">
.menu_submenu_popper {
  .el-menu-item {
    height: 50px;
    line-height: 1;
    font-size: 16px;
    color: #505050;
  }

  .el-menu-item:hover {
    background-color: #ecf5ff;
  }

  .el-menu-item span {
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>