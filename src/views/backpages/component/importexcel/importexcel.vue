<script setup name="backstage:component:importexcel">
const showImportExcelDialog = ref(false)
const iconName = ref('')
</script>

<template>
  <div class="page_container importexcel_page">
    <div class="title_wrap">数据导入 🍓🍇🍈🍉</div>
    <div class="import_excel_wrap">
      <el-button type="primary" @click="showImportExcelDialog = true;">数据导入</el-button>
      <ImportExcel v-model="showImportExcelDialog" title="数据导入"></ImportExcel>
    </div>
    <div class="doc_wrap">
      <el-descriptions class="descriptions" title="配置项 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="v-model">
          <span>双向绑定弹框显示</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="title">
          <span>弹框标题</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="tempApi">
          <span>模板下载地址</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="uploadApi">
          <span>文件上传地址</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="maxFileSize">
          <span>文件大小最大值，单位MB</span>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="事件 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="import-success">
          <span>数据导入成功触发</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.importexcel_page {
  width: 100%;

  .title_wrap {
    margin-top: 15px;
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    color: var(--el-text-color-regular);
  }

  .import_excel_wrap {
    margin-top: 30px;
    text-align: center;
  }

  .doc_wrap {
    margin-top: 30px;

    .descriptions + .descriptions {
      margin-top: 20px;
    }
  }
}
</style>