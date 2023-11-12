<script setup name="Sidebar">
import SidebarItem from './SidebarItem.vue'
import useUserStore from '@/pinia/modules/user.js'
import useAppStore from '@/pinia/modules/app.js'

const $route = useRoute()
const userStore = useUserStore()
const appStore = useAppStore()

// 菜单列表
const menus = computed(() => userStore.userInfo.routes || [])
// 是否折叠菜单栏
const collapse = computed(() => appStore.configData.collapse === 1 ? true : false)
// 页面加载时默认激活的菜单
const defaultActive = computed(() => $route.name)
</script>

<template>
  <div class="comp_container sidebar_comp">
    <div class="logo_title">
      <img class="logo" src="@/assets/images/logo.svg" alt="logo">
      <span class="title">后台管理系统</span>
    </div>
    <el-menu
      :collapse="collapse"
      :default-active="defaultActive"
      unique-opened
    >
      <SidebarItem :menus="menus" />
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.sidebar_comp {
  width: 100%;

  .logo_title {
    position: sticky;
    top: 0;
    z-index: 99;
    height: $layout-header-height;
    display: flex;
    align-items: center;
    padding: 0 0 0 15px;
    background-color: var(--theme-aside-logo-bg-color);
    color: var(--theme-aside-logo-font-color);
    transition: all 0.3s;
    
    .logo {
      width: 30px;
      height: 30px;
    }

    .title {
      margin-left: 20px;
      font-size: 20px;
      font-weight: bold;
      white-space: nowrap;
    }
  }

  // el-menu 样式 ------------------------------------------------------------------------------------------
  :deep(.el-menu) {
    border-right: none;
    background-color: var(--theme-menu-bg-color);
  }

  // el-sub-menu 样式 --------------------------------------------------------------------------------------
  :deep(.el-sub-menu) {
    background-color: var(--theme-submenu-bg-color);
    .el-sub-menu__title {
      height: 50px;
      line-height: 1;
      font-size: 16px;
      color: var(--theme-submenu-title-font-color);
      background-color: var(--theme-submenu-title-bg-color);
      border-radius: 7px;
    }
    .el-sub-menu__title span {
      margin-left: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .el-sub-menu__title .svg-icon {
      fill: var(--theme-submenu-title-font-color);
    }
    .el-sub-menu__title .el-icon {
      font-size: 16px;
    }
    .el-sub-menu__title:hover {
      color: var(--theme-submenu-title-hover-font-color);
      background-color: var(--theme-submenu-title-hover-bg-color);
    }
    .el-sub-menu__title:hover .svg-icon {
      fill: var(--theme-submenu-title-hover-font-color);
    }
  }
  :deep(.el-sub-menu:hover) {
    background-color: var(--theme-submenu-hover-bg-color);
  }
  :deep(.el-sub-menu.is-opened) {
    background-color: var(--theme-submenu-opened-bg-color);
    .el-sub-menu__title {
      color: var(--theme-submenu-title-opened-font-color);
      background-color: var(--theme-submenu-title-opened-bg-color);
    }
    .el-sub-menu__title .svg-icon {
      fill: var(--theme-submenu-title-opened-font-color);
    }
  }
  :deep(.el-sub-menu.is-active) {
    background-color: var(--theme-submenu-active-bg-color);
    .el-sub-menu__title {
      color: var(--theme-submenu-title-active-font-color);
      background-color: var(--theme-submenu-title-active-bg-color);
    }
    .el-sub-menu__title .svg-icon {
      fill: var(--theme-submenu-title-active-font-color);
    }
  }

  // el-menu-item 样式 ----------------------------------------------------------------------------------------
  :deep(.el-menu-item) {
    height: 50px;
    line-height: 1;
    font-size: 16px;
    color: var(--theme-menuitem-font-color);
    background-color: var(--theme-menuitem-bg-color);
    transition: none;
    border-radius: 7px;
  }
  :deep(.el-menu-item span) {
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :deep(.el-menu-item .svg-icon) {
    fill: var(--theme-menuitem-font-color);
  }
  :deep(.el-menu-item:hover) {
    color: var(--theme-menuitem-hover-font-color);
    background-color: var(--theme-menuitem-hover-bg-color);
  }
  :deep(.el-menu-item:hover .svg-icon) {
    fill: var(--theme-menuitem-hover-font-color);
  }
  :deep(.el-menu-item.is-active) {
    color: var(--theme-menuitem-active-font-color);
    background-color: var(--theme-menuitem-active-bg-color);
  }
  :deep(.el-menu-item.is-active .svg-icon) {
    fill: var(--theme-menuitem-active-font-color);
  }
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