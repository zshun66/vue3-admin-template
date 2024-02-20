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
    $router.push(`${menu.path}`)
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
.el-popper.menu_submenu_popper {
  background: var(--theme-aside-bg-color);

  // el-menu 样式 --------------------------------------------------------------------------------------------------------------------------------------------------------
  .el-menu {
    border-right: none;
    background-color: var(--theme-menu-bg-color);
  }

  // el-menu-item 样式 ----------------------------------------------------------------------------------------------------------------------------------------------------
  .el-menu-item {
    height: 50px;
    line-height: 1;
    font-size: 16px;
    background-color: var(--theme-menuitem-bg-color);
    transition: none;
    border-radius: 0px;
  }
  .el-menu-item .svg-icon {
    fill: var(--theme-menuitem-font-color);
  }
  .el-menu-item span {
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--theme-menuitem-font-color);
  }
  .el-menu-item:hover {
    background-color: var(--theme-menuitem-hover-bg-color);
  }
  .el-menu-item:hover .svg-icon {
    fill: var(--theme-menuitem-hover-font-color);
  }
  .el-menu-item:hover span {
    color: var(--theme-menuitem-hover-font-color);
  }
  .el-menu-item.is-active {
    background-color: var(--theme-menuitem-active-bg-color);
  }
  .el-menu-item.is-active .svg-icon {
    fill: var(--theme-menuitem-active-font-color);
  }
  .el-menu-item.is-active span {
    color: var(--theme-menuitem-active-font-color);
  }

  // el-sub-menu 样式 -------------------------------------------------------------------------------------------------------------------------------------------------
  .el-sub-menu {
    background-color: var(--theme-submenu-bg-color);
    border-radius: 7px;
    .el-sub-menu__title {
      height: 50px;
      line-height: 1;
      font-size: 16px;
      background-color: var(--theme-submenu-title-bg-color);
      transition: none;
      border-radius: 0px;
    }
    .el-sub-menu__title .svg-icon {
      fill: var(--theme-submenu-title-font-color);
    }
    .el-sub-menu__title span {
      margin-left: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--theme-submenu-title-font-color);
    }
    .el-sub-menu__title .el-icon {
      font-size: 16px;
      color: var(--theme-submenu-title-font-color);
    }
    .el-sub-menu__title:hover {
      background-color: var(--theme-submenu-title-hover-bg-color);
    }
    .el-sub-menu__title:hover .svg-icon {
      fill: var(--theme-submenu-title-hover-font-color);
    }
    .el-sub-menu__title:hover span {
      color: var(--theme-submenu-title-hover-font-color);
    }
    .el-sub-menu__title:hover .el-icon {
      color: var(--theme-submenu-title-hover-font-color);
    }
  }
  .el-sub-menu.is-opened {
    background-color: var(--theme-submenu-opened-bg-color);
    > .el-sub-menu__title {
      background-color: var(--theme-submenu-title-opened-bg-color);
    }
    > .el-sub-menu__title .svg-icon {
      fill: var(--theme-submenu-title-opened-font-color);
    }
    > .el-sub-menu__title span {
      color: var(--theme-submenu-title-opened-font-color);
    }
    > .el-sub-menu__title .el-icon {
      color: var(--theme-submenu-title-opened-font-color);
    }
  }
  .el-sub-menu.is-active {
    background-color: var(--theme-submenu-active-bg-color);
    > .el-sub-menu__title {
      background-color: var(--theme-submenu-title-active-bg-color);
    }
    > .el-sub-menu__title .svg-icon {
      fill: var(--theme-submenu-title-active-font-color);
    }
    > .el-sub-menu__title span {
      color: var(--theme-submenu-title-active-font-color);
    }
    > .el-sub-menu__title .el-icon {
      color: var(--theme-submenu-title-active-font-color);
    }
  }
}
</style>