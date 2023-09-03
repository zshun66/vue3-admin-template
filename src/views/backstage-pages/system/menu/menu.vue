<script setup name="menu">

const queryForm = ref({})

const initQueryForm = function () {
  queryForm.value = {
    name: '', // 菜单名称
    status: '', // 菜单状态
  }
}

initQueryForm()
</script>

<template>
  <div class="page_container menu_container">
    <el-form ref="queryFormRef" :model="queryForm" label-width="auto" inline> 
        <el-form-item label="Activity name" prop="name">A</el-form-item>
        <el-form-item label="Activity zone" prop="zone">B</el-form-item>
        <el-form-item label="Activity time" prop="time">C</el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.menu_container {
  
}
</style>