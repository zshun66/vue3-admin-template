<script setup name="layout">
import Sidebar from './components/Sidebar/Sidebar.vue'
import Navbar from './components/Navbar/Navbar.vue'
</script>

<template>
  <el-container class="comp_container layout_comp">
    <el-aside class="layout_aside custom_scrollbar">
      <Sidebar />
    </el-aside>
    <el-container class="layout_inner_container">
      <el-header class="layout_header">
        <Navbar />
      </el-header>
      <el-main class="layout_main">
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout_comp {
  width: 100%;
  height: 100%;

  .layout_aside {
    width: $layout-aside-width;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: var(--theme-aside-bg-color);
    transition: background-color 0.3s;
  }

  .layout_inner_container {

    .layout_header {
      height: $layout-header-height;
      background-color: var(--theme-navbar-bg-color);
      transition: background-color 0.3s;
    }

    .layout_main {
      background-color: var(--theme-main-bg-color);
      transition: background-color 0.3s;
    }
  }
}
</style>