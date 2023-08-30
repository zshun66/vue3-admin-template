<script setup name="Theme">
// 是否显示抽屉
const showDrawer = ref(false)

// 主题列表
const themeList = [
  { name: 'light', },
  { name: 'dark', },
]
// 当前主题
const currTheme = ref('light')

// 切换主题
const toggleTheme = function (theme) {
  if (currTheme.value !== theme.name) {
    currTheme.value = theme.name
  }
}
</script>

<template>
  <div class="comp_container theme_comp" title="主题切换" @click="showDrawer = true">
    <icon-theme theme="outline" size="24" fill="#fff" :strokeWidth="3"/>
  </div>

  <el-drawer
    class="theme_toggle_drawer"
    v-model="showDrawer"
    :append-to-body="false"
    :show-close="false"
    :with-header="false"
    size="25%"
  >
    <div class="drawer_content">
      <div class="title">切换主题</div>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
.theme_comp {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;
}

.theme_toggle_drawer {
  .drawer_content {
    .title {

    }
  }
}
</style>