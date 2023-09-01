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
      class="sidebar-menu"
      :collapse="collapse"
      unique-opened
    >
      <el-sub-menu index="system" title="系统管理">
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

  .logo_title {
    position: sticky;
    top: 0;
    z-index: 99;
    padding: 0 20px;
    height: $layout-header-height;
    display: flex;
    align-items: center;
    background-color: var(--theme-aside-logo-bg-color);
    color: var(--theme-aside-logo-font-color);
    transition: all 0.3s;
    
    .logo {
      width: 30px;
      height: 30px;
    }

    .title {
      margin-left: 30px;
      font-size: 20px;
      font-weight: bold;
    }
  }

  :deep(.el-menu) {
    border-right: none;
    background-color: transparent;
  }

  :deep(.el-sub-menu__title) {
    padding: 0 44px 0 50px !important;
    height: 50px;
    line-height: 1;
    font-size: 16px;
    color: var(--theme-submenu-font-color);
  }
  :deep(.el-sub-menu__title:hover) {
    background-color: var(--theme-submenu-hover-bg-color);
  }
  :deep(.el-sub-menu__title .svg-icon) {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  }
  :deep(.el-sub-menu__title span) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :deep(.el-sub-menu__title .el-icon) {
    font-size: 14px;
  }
  
  :deep(.el-menu-item) {
    padding: 0 44px 0 50px !important;
    height: 50px;
    line-height: 1;
    font-size: 16px;
    color: var(--theme-menuitem-font-color);
  }
  :deep(.el-menu-item:hover) {
    background-color: var(--theme-menuitem-hover-bg-color);
  }
  :deep(.el-menu-item .svg-icon) {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  }
  :deep(.el-menu-item span) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>