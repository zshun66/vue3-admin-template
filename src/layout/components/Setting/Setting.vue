<script setup name="Setting">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()
const appConfig = computed(() => appStore.appConfig)

// 是否显示抽屉
const showDrawer = ref(false)
</script>

<template>
  <div class="comp_container setting_comp" title="应用设置" @click="showDrawer = true">
    <svg-icon name="setting1" size="23px"></svg-icon>
  </div>

  <el-drawer
    class="setting_drawer"
    v-model="showDrawer"
    :append-to-body="false"
    :show-close="true"
    :with-header="true"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    :destroy-on-close="true"
    :size="300"
  >
    <template #header>
      <div class="drawer_header">
        <span class="drawer_title">应用设置</span>
      </div>
    </template>
    <div class="drawer_content">
      <el-divider>界面设置</el-divider>
      <div class="setting-item">
        <span class="label">菜单折叠</span>
        <el-switch v-model="appConfig.collapse.value" @change="($event) => appStore.setConfigData('collapse', $event)" />
      </div>
      <div class="setting-item">
        <span class="label">菜单手风琴</span>
        <el-switch v-model="appConfig.accordion.value" @change="($event) => appStore.setConfigData('accordion', $event)" />
      </div>
      <div class="setting-item">
        <span class="label">页面过渡</span>
        <el-switch v-model="appConfig.pageTranstion.value" @change="($event) => appStore.setConfigData('pageTranstion', $event)" />
      </div>
      <div class="setting-item">
        <span class="label">折叠菜单控件</span>
        <el-switch v-model="appConfig.showCollapse.value" @change="($event) => appStore.setConfigData('showCollapse', $event)" />
      </div>
      <div class="setting-item">
        <span class="label">面包屑</span>
        <el-switch v-model="appConfig.showBreadcrumb.value" @change="($event) => appStore.setConfigData('showBreadcrumb', $event)" />
      </div>
      <div class="setting-item">
        <span class="label">搜索控件</span>
        <el-switch v-model="appConfig.showSearch.value" @change="($event) => appStore.setConfigData('showSearch', $event)" />
      </div>
      <div class="setting-item">
        <span class="label">全屏切换控件</span>
        <el-switch v-model="appConfig.showFullscreen.value" @change="($event) => appStore.setConfigData('showFullscreen', $event)" />
      </div>
      <div class="setting-item">
        <span class="label">主题切换控件</span>
        <el-switch v-model="appConfig.showTheme.value" @change="($event) => appStore.setConfigData('showTheme', $event)" />
      </div>
      <div class="setting-item">
        <span class="label">语言切换控件</span>
        <el-switch v-model="appConfig.showLanguage.value" @change="($event) => appStore.setConfigData('showLanguage', $event)" />
      </div>
      <div class="setting-item">
        <span class="label">组件大小控件</span>
        <el-switch v-model="appConfig.showSize.value" @change="($event) => appStore.setConfigData('showSize', $event)" />
      </div>
      <div class="setting-item">
        <span class="label">标签栏</span>
        <el-switch v-model="appConfig.showTagsView.value" @change="($event) => appStore.setConfigData('showTagsView', $event)" />
      </div>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
.setting_comp {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;

  :deep(.svg-icon) {
    fill: var(--theme-navbar-icon-color);
  }
}
</style>

<style lang="scss">
.setting_drawer {
  .el-drawer__header {
    margin-bottom: 0px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  .drawer_header {

    .drawer_title {
      font-size: 18px;
      color: var(--el-text-color-primary);
    }
  }

  .drawer_content {

    .setting-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 14px 0;

      .label {
        font-size: 14px;
      }
    }
  }
}
</style>