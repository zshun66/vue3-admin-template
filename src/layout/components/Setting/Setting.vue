<script setup name="Setting">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

// 是否显示抽屉
const showDrawer = ref(false)

</script>

<template>
  <div class="comp_container setting_comp" title="设置" @click="showDrawer = true">
    <icon-setting-config theme="outline" size="22" :strokeWidth="3"/>
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
  padding: 10px 10px;
  cursor: pointer;

  :deep(.i-icon svg path),
  :deep(.i-icon svg rect) {
    stroke: var(--theme-navbar-icon-color);
  }
}

.setting_drawer {
  .drawer_content {
   
  }
}
</style>