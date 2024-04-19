<script setup name="backstage:component:wangeditor">
const richTextContent = ref('')
</script>

<template>
  <div class="page_container wangeditor_page">
    <div class="title_wrap">富文本编辑器(WangEditor) 🍓🍇🍈🍉</div>
    <div class="wang_editor_wrap">
      <WangEditor v-model="richTextContent"></WangEditor>
    </div>
    <div class="return_value_wrap">
      <span>返回值(富文本内容)：{{ richTextContent }}</span>
    </div>
    <div class="doc_wrap">
      <el-descriptions class="descriptions" title="配置项 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="v-model">
          <span>双向绑定富文本内容</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="height">
          <span>富文本编辑器高度</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="mode">
          <span>富文本编辑器模式，可取值：default(默认模式)、simple(简易模式)</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="editorConfig">
          <span>编辑器配置，详见WangEditor官方文档：https://www.wangeditor.com/v5/editor-config.html</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="toolbarConfig">
          <span>工具栏配置配置，详见WangEditor官方文档：https://www.wangeditor.com/v5/toolbar-config.html</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wangeditor_page {
  width: 100%;

  .title_wrap {
    margin-top: 15px;
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    color: var(--el-text-color-regular);
  }

  .wang_editor_wrap {
    margin-top: 30px;
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