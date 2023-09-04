<script setup name="role">

// 查询参数
const queryForm = ref({})
// 角色数据
const roleList = ref([])
// 数据总数
const roleTotal = ref(100)

// 初始化查询参数
const initQueryForm = function () {
  queryForm.value = {
    pageNum: 1,
    pageSize: 10,
    name: '', // 角色名称
    status: '', // 角色状态
  }
}

// 搜索
const handleSearch = function () {
  console.log(queryForm.value)
}

// 重置
const handleReset = function () {
  initQueryForm()
}

// 新增
const handleAdd = function () {
}

// 修改
const handleModify = function () {
}

// 删除
const handleDelete = function () {
}

// 导出
const handleExport = function () {
}

initQueryForm()
</script>

<template>
  <div class="page_container role_container">
    <el-form
      ref="queryFormRef"
      :model="queryForm"
      label-width="auto"
      inline
    >
      <el-form-item label="角色名称:" prop="name">
        <el-input
          style="width: 200px;"
          v-model="queryForm.name"
          clearable
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色状态:" prop="status">
        <el-select
          style="width: 150px;"
          v-model="queryForm.status"
          clearable
          placeholder="请选择"
        >
          <el-option label="正常" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button type="info" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="operate_btn_group">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="success" plain @click="handleModify">修改</el-button>
      <el-button type="danger" plain @click="handleDelete">删除</el-button>
      <el-button type="danger" plain @click="handleExport">导出</el-button>
    </div>

    <el-table
      class="role_list_table"
      height="100%"
      :data="roleList"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="角色编号"></el-table-column>
      <el-table-column label="角色名称"></el-table-column>
      <el-table-column label="权限字符"></el-table-column>
      <el-table-column label="显示顺序"></el-table-column>
      <el-table-column label="状态"></el-table-column>
      <el-table-column label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" plain @click="handleModify">修改</el-button>
        <el-button type="info" plain @click="handleDelete">删除</el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      class="role_list_pagination"
      v-model:current-page="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :total="roleTotal"
      background
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<style scoped lang="scss">
.role_container {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;

  .operate_btn_group {
    margin-top: 10px;
  }

  .role_list_table {
    margin-top: 10px;
  }

  .role_list_pagination {
    margin-top: 10px;
    justify-content: flex-end;
  }
}
</style>