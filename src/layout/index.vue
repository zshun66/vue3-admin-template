<script setup name="layout">
import Sidebar from './components/Sidebar/Sidebar.vue'
import Navbar from './components/Navbar/Navbar.vue'
import TagsView from './components/TagsView/TagsView.vue'
import useAppStore from '@/pinia/modules/app.js'
import useTagStore from '@/pinia/modules/tag.js'

const $route = useRoute()
const appStore = useAppStore()
const tagStore = useTagStore()

const showRouteView = ref(true)

// 刷新页面
const refreshPage = () => {
  console.log('刷新页面', $route, tagStore.tagPages)
  showRouteView.value = false
  let findIndex = tagStore.tagPages.findIndex(item => item.name === $route.name)
  let findItem = tagStore.tagPages[findIndex]
  tagStore.removeTagPageByIndex(findIndex)
  nextTick(() => {
    showRouteView.value = true
    tagStore.tagPages.splice(findIndex, 0, findItem)
  })
}

provide('refreshPage', refreshPage)
</script>

<template>
  <el-container class="comp_container layout_comp">
    <el-aside
      class="layout_aside custom_scrollbar"
      :class="{ shrink: appStore.collapse }"
    >
      <Sidebar />
    </el-aside>
    <el-container class="layout_inner_container">
      <el-header class="layout_header">
        <div class="navbar_container">
          <Navbar />
        </div>
        <div class="tagsview_container">
          <TagsView />
        </div>
      </el-header>
      <el-main class="layout_main custom_scrollbar">
        <router-view v-slot="{ Component }">
          <transition
            :name="appStore.pageTranstion ? 'fade-transform' : 'none'"
            mode="out-in" appear
          >
            <keep-alive :include="tagStore.cacheNames">
              <component :is="Component" :key="$route.name" v-if="showRouteView"></component>
            </keep-alive>
          </transition>
        </router-view>
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
    margin-right: 10px;
    padding: 0 10px;
    width: $layout-aside-expand-width;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: var(--theme-aside-bg-color);
    transition: width 0.3s;
    border-radius: 10px;
    &.shrink {
      width: $layout-aside-shrink-width;
    }
  }

  .layout_inner_container {

    .layout_header {
      margin-bottom: 10px;
      padding: 0 0;
      height: auto;
      border-radius: 10px;
      background-color: var(--theme-header-bg-color);

      .navbar_container {
        padding: 0 20px 0 3px;
        height: $layout-navbar-height;
        border-bottom: 1px solid var(--theme-navbar-border-color);
      }

      .tagsview_container {
        padding: 0 10px 0 13px;
        height: $layout-tagbar-height;
        display: flex;
        align-items: center;
      }
    }

    .layout_main {
      padding: 0px 0px;
      background-color: var(--theme-main-bg-color);
      color: var(--theme-main-font-color);
      border-radius: 10px;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>