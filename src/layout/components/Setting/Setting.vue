<script setup name="Setting">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

// 是否显示抽屉
const showDrawer = ref(false)

</script>

<template>
  <div class="comp_container setting_comp" title="设置" @click="showDrawer = true">
    <template v-if="appStore.configData.theme === 'light'">
      <icon-setting-config theme="outline" size="22" fill="#505050" :strokeWidth="3"/>
    </template>
    <template v-if="appStore.configData.theme === 'dark'">
      <icon-setting-config theme="outline" size="22" fill="#cccccc" :strokeWidth="3"/>
    </template>
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
}

.setting_drawer {
  .drawer_content {
   
  }
}
</style>