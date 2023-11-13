<script setup name="layout-style1">
import Sidebar from './components/Sidebar/Sidebar.vue'
import Navbar from './components/Navbar/Navbar.vue'
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()
</script>

<template>
  <el-container class="comp_container layout_style1_comp">
    <el-aside
      class="layout_aside custom_scrollbar"
      :class="{ shrink: appStore.configData.collapse === 1 }"
    >
      <Sidebar />
    </el-aside>
    <el-container class="layout_inner_container">
      <el-header class="layout_header">
        <Navbar />
      </el-header>
      <el-main class="layout_main custom_scrollbar">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout_style1_comp {
  width: 100%;
  height: 100%;
  background-color: var(--theme-layout-bg-color);
  transition: all 0.3s;

  .layout_aside {
    padding: 0 10px;
    width: $layout-aside-expand-width;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: var(--theme-aside-bg-color);
    transition: all 0.3s;
    &.shrink {
      width: $layout-aside-shrink-width;
    }
  }

  .layout_inner_container {
    .layout_header {
      padding: 0 20px 0 13px;
      height: $layout-header-height;
      background-color: var(--theme-navbar-bg-color);
      transition: background-color 0.3s;
    }

    .layout_main {
      padding: 10px 10px;
      background-color: var(--theme-main-bg-color);
      transition: background-color 0.3s;
      color: var(--theme-main-font-color);

      :deep(.page_container) {
        background-color: var(--theme-page-bg-color_layout-style1);
      }
    }
  }
}
</style>