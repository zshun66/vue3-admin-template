<script setup name="backstage:dashboard:workbenches">
const showImportExcel = ref(false)
</script>

<template>
  <div class="page_container workbenches_page">
    <el-button type="primary" @click="showImportExcel = true">导入数据</el-button>
    <ImportExcel v-model="showImportExcel">
      <template #empty>按时发生</template>
    </ImportExcel>
  </div>
</template>

<style scoped lang="scss"></style>