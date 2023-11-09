<script setup name="Sidebar">
import SidebarItem from './SidebarItem.vue'
import useUserStore from '@/pinia/modules/user.js'
import useAppStore from '@/pinia/modules/app.js'

const userStore = useUserStore()
const appStore = useAppStore()

// 菜单列表
const menus = computed(() => userStore.userInfo.routes || [])
// 是否折叠菜单栏
const collapse = computed(() => appStore.configData.collapse === 1 ? true : false)
</script>

<template>
  <div class="comp_container sidebar_comp">
    <div class="logo_title">
      <img class="logo" src="@/assets/images/logo.svg" alt="logo">
      <span class="title">后台管理系统</span>
    </div>
    <el-menu
      :collapse="collapse"
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
    background-color: transparent;
  }

  // el-sub-menu 样式 --------------------------------------------------------------------------------------
  :deep(.el-sub-menu) {

  }
  :deep(.el-sub-menu .el-sub-menu__title) {
    height: 50px;
    line-height: 1;
    font-size: 16px;
    color: var(--theme-submenu-title-font-color);
  }
  :deep(.el-sub-menu .el-sub-menu__title:hover) {
    background-color: var(--theme-submenu-title-hover-bg-color);
  }
  :deep(.el-sub-menu .el-sub-menu__title span) {
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :deep(.el-sub-menu .el-sub-menu__title .svg-icon) {
    fill: var(--theme-submenu-title-font-color);
  }
  :deep(.el-sub-menu .el-sub-menu__title .el-icon) {
    font-size: 16px;
  }

  :deep(.el-sub-menu.is-opened) {
    background-color: var(--theme-submenu-title-opened-bg-color);
  }

  :deep(.el-sub-menu.is-active .el-sub-menu__title) {
    color: var(--theme-submenu-title-active-font-color);
  }
  :deep(.el-sub-menu.is-active .el-sub-menu__title .svg-icon) {
    fill: var(--theme-submenu-title-active-font-color);
  }
  
  // el-menu-item 样式 ----------------------------------------------------------------------------------------
  :deep(.el-menu-item) {
    height: 50px;
    line-height: 1;
    font-size: 16px;
    color: var(--theme-menuitem-font-color);
  }
  :deep(.el-menu-item:hover) {
    background-color: var(--theme-menuitem-hover-bg-color);
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
  
  :deep(.el-menu-item.is-active) {
    color: var(--theme-menuitem-active-font-color);
    background-color: var(--theme-menuitem-active-bg-color);
  }
  :deep(.el-menu-item.is-active .svg-icon) {
    fill: var(--theme-menuitem-active-font-color);
  }
}
</style>