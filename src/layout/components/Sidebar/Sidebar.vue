<script setup name="Sidebar">
import SidebarItem from './SidebarItem.vue'
import useUserStore from '@/pinia/modules/user.js'
import useAppStore from '@/pinia/modules/app.js'

const $route = useRoute()
const userStore = useUserStore()
const appStore = useAppStore()

// 菜单列表
const menus = computed(() => userStore.userInfo.menus || [])
// 是否折叠菜单栏
const collapse = computed(() => appStore.configData.collapse === 1 ? true : false)
// 页面加载时默认激活的菜单
const defaultActive = computed(() => $route.name)
</script>

<template>
  <div class="comp_container sidebar_comp">
    <div class="logo_title">
      <img class="logo" src="@/assets/images/logo.svg" alt="logo">
      <span class="title" v-if="!collapse">后台管理系统</span>
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
    height: $layout-navbar-height;
    display: flex;
    align-items: center;
    padding: 0 0 0 15px;
    color: var(--theme-aside-logo-font-color);
    
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

  // el-menu 样式 --------------------------------------------------------------------------------------------------------------------------------------------------------
  :deep(.el-menu) {
    margin-top: 8px;
    border-right: none;
    background-color: var(--theme-menu-bg-color);
  }

  // el-menu-item 样式 ----------------------------------------------------------------------------------------------------------------------------------------------------
  :deep(.el-menu-item) {
    height: 50px;
    line-height: 1;
    font-size: 16px;
    background-color: var(--theme-menuitem-bg-color);
    transition: none;
    border-radius: 7px;
  }
  :deep(.el-menu-item .svg-icon) {
    fill: var(--theme-menuitem-font-color);
  }
  :deep(.el-menu-item span) {
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--theme-menuitem-font-color);
  }
  :deep(.el-menu-item:hover) {
    background-color: var(--theme-menuitem-hover-bg-color);
  }
  :deep(.el-menu-item:hover .svg-icon) {
    fill: var(--theme-menuitem-hover-font-color);
  }
  :deep(.el-menu-item:hover span) {
    color: var(--theme-menuitem-hover-font-color);
  }
  :deep(.el-menu-item.is-active) {
    background-color: var(--theme-menuitem-active-bg-color);
  }
  :deep(.el-menu-item.is-active .svg-icon) {
    fill: var(--theme-menuitem-active-font-color);
  }
  :deep(.el-menu-item.is-active span) {
    color: var(--theme-menuitem-active-font-color);
  }

  // el-sub-menu 样式 -------------------------------------------------------------------------------------------------------------------------------------------------
  :deep(.el-sub-menu) {
    background-color: var(--theme-submenu-bg-color);
    border-radius: 7px;
    .el-sub-menu__title {
      height: 50px;
      line-height: 1;
      font-size: 16px;
      background-color: var(--theme-submenu-title-bg-color);
      transition: none;
      border-radius: 7px;
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
  :deep(.el-sub-menu.is-opened) {
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
  :deep(.el-sub-menu.is-active) {
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