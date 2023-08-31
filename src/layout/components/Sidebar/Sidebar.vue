<script setup name="Sidebar">

</script>

<template>
  <div class="comp_container sidebar_comp">
    <div class="logo_title">
      <img class="logo" src="@/assets/images/logo.svg" alt="logo">
      <span class="title">后台管理系统</span>
    </div>
    <el-menu
      class="sidebar-menu"
    >
      <el-sub-menu index="system">
        <template #title>
          <span>系统管理</span>
        </template>
        <el-menu-item index="user">
          <template #title>
            <span>用户管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="role">
          <template #title>
            <span>角色管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="menu">
          <template #title>
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
    z-index: 9999;
    padding: 0 20px;
    height: $layout-header-height;
    display: flex;
    align-items: center;
    background-color: var(--theme-aside-logo-bg-color);
    color: var(--theme-aside-logo-color);
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
    background-color: transparent;
  }
}
</style>