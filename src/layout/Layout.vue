<script setup name="Layout">
import Sidebar from './components/Sidebar/Sidebar.vue'
import Navbar from './components/Navbar/Navbar.vue'
</script>

<template>
  <div class="comp_container layout_comp">
    <el-container class="layout_outer_container">
      <el-aside class="layout_aside custom_scrollbar">
        <Sidebar />
      </el-aside>
      <el-container class="layout_inner_container">
        <el-header class="layout_header">
          <Navbar />
        </el-header>
        <el-main class="layout_main"></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout_comp {
  width: 100%;
  height: 100%;

  .layout_outer_container {
    width: 100%;
    height: 100%;

    .layout_aside {
      width: 280px;
      overflow-x: hidden;
      overflow-y: auto;
      background: #000;
    }

    .layout_inner_container {

      .layout_header {
        background: #000;
      }

      .layout_main {

      }
    }
  }
}
</style>