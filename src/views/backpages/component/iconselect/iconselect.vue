<script setup name="backstage:component:iconselect">
const showIconSelectDialog = ref(false)
const iconName = ref('')
const iconType = ref('svg')
</script>

<template>
  <div class="page_container iconselect_page">
    <div class="title_wrap">图标选择器 🍓🍇🍈🍉</div>
    <div class="icon_select_wrap">
      <el-button type="primary" @click="showIconSelectDialog = true; iconType = 'svg';">打开SVG图标选择器</el-button>
      <el-button type="primary" @click="showIconSelectDialog = true; iconType = 'ele';">打开ELE图标选择器</el-button>
      <IconSelect v-model:show="showIconSelectDialog" v-model:icon="iconName" :type="iconType" :title="`请选择${iconType}图标`"></IconSelect>
    </div>
    <div class="return_value_wrap">
      <span>返回值(所选图标名称)：{{ iconName }}</span>
    </div>
    <div class="doc_wrap">
      <el-descriptions class="descriptions" title="配置项 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="v-model:show">
          <span>双向绑定弹框显示</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="v-model:icon">
          <span>双向绑定所选择的图标的名称</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="type">
          <span>图标的类型，可取值：svg(svg图标)、ele(Element Plus图标)</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="title">
          <span>弹框标题</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.iconselect_page {
  width: 100%;

  .title_wrap {
    margin-top: 15px;
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    color: var(--el-text-color-regular);
  }

  .icon_select_wrap {
    margin-top: 30px;
    text-align: center;
  }

  .return_value_wrap {
    margin-top: 30px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: var(--el-text-color-regular);
  }

  .doc_wrap {
    margin-top: 30px;
  }
}
</style>