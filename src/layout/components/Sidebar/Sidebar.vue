<script setup name="Sidebar">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

const collapse = computed(() => appStore.configData.collapse === 1 ? true : false)
</script>

<template>
  <div class="comp_container sidebar_comp">
    <div class="logo_title">
      <img class="logo" src="@/assets/images/logo.svg" alt="logo">
      <span class="title">后台管理系统</span>
    </div>
    <el-menu
      class="sidebar_menu"
      :collapse="collapse"
      unique-opened
    >
      <el-sub-menu popper-class="menu_submenu_popper" index="system" title="系统管理">
        <template #title>
          <svg-icon name="system1" size="20px" color="#505050"></svg-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="user" title="用户管理">
          <template #title>
            <svg-icon name="user1" size="20px" color="#505050"></svg-icon>
            <span>用户管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="role" title="角色管理">
          <template #title>
            <svg-icon name="role1" size="20px" color="#505050"></svg-icon>
            <span>角色管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="menu" title="菜单管理">
          <template #title>
            <svg-icon name="menu1" size="20px" color="#505050"></svg-icon>
            <span>菜单管理</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
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

  :deep(.el-menu) {
    border-right: none;
    background-color: transparent;
  }

  :deep(.el-sub-menu__title) {
    height: 50px;
    line-height: 1;
    font-size: 16px;
    color: var(--theme-submenu-font-color);
  }
  :deep(.el-sub-menu__title:hover) {
    background-color: var(--theme-submenu-hover-bg-color);
  }
  :deep(.el-sub-menu__title .svg-icon) {
  }
  :deep(.el-sub-menu__title span) {
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :deep(.el-sub-menu__title .el-icon) {
    font-size: 16px;
  }
  
  :deep(.el-menu-item) {
    height: 50px;
    line-height: 1;
    font-size: 16px;
    color: var(--theme-menuitem-font-color);
  }
  :deep(.el-menu-item:hover) {
    background-color: var(--theme-menuitem-hover-bg-color);
  }
  :deep(.el-menu-item .svg-icon) {
  }
  :deep(.el-menu-item span) {
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

<style>
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