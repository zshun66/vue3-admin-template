<script setup name="Setting">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

// 是否显示抽屉
const showDrawer = ref(false)

</script>

<template>
  <div class="comp_container setting_comp" title="设置" @click="showDrawer = true">
    <svg-icon name="setting1" size="23px"></svg-icon>
  </div>

  <el-drawer
    class="setting_drawer"
    v-model="showDrawer"
    :append-to-body="false"
    :show-close="false"
    :with-header="false"
    size="25%"
  >
    <div class="drawer_content">
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

.setting_drawer {
  .drawer_content {
   
  }
}
</style>