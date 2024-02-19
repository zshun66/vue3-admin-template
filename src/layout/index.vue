<script setup name="layout">
import Sidebar from './components/Sidebar/Sidebar.vue'
import Navbar from './components/Navbar/Navbar.vue'
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()
</script>

<template>
  <el-container class="comp_container layout_comp">
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
.layout_comp {
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  background-color: var(--theme-layout-bg-color);

  .layout_aside {
    padding: 0 10px;
    width: $layout-aside-expand-width;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: var(--theme-aside-bg-color);
    border-radius: 10px;
    &.shrink {
      width: $layout-aside-shrink-width;
    }
  }

  .layout_inner_container {
    margin-left: 10px;
    .layout_header {
      padding: 0 20px 0 3px;
      height: $layout-header-height;
      background-color: var(--theme-navbar-bg-color);
      border-radius: 10px;
    }

    .layout_main {
      margin-top: 10px;
      padding: 0px 0px;
      background-color: var(--theme-main-bg-color);
      color: var(--theme-main-font-color);
      border-radius: 10px;
    }
  }
}
</style>