<script setup name="role">
import AddOrModify from './components/AddOrModify/AddOrModify.vue'
import { reqRoleList } from '@/api/system/role.js'

// 查询参数
const queryForm = ref({})
// 表单数据
const formData = ref({})
// 角色数据
const roleList = ref([])
// 数据总数
const roleTotal = ref(100)
// 是否显示添加/修改弹框
const showAddOrModifyDialog = ref(false)
// 添加/修改弹框类型
const addOrModifyDialogType = ref('add')


// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 10,
    name: '',
    status: '',
  }
}

// 初始化表单数据
const initFormData = function() {
  formData.value = {
    name: '',
    perms: '',
    sort: null,
    status: '1',
    menus: []
  }
}

// 获取角色列表
const getRoleList = async function() {
  const { result } = await reqRoleList(queryForm.value)
  if (!result) return
  roleList.value = result.data || []
  roleTotal.value = result.total || 0
}

// 搜索
const handleSearch = function() {
  queryForm.value.pageNum = 1
  getRoleList()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getRoleList()
}

// 新增
const handleAdd = function() {
  initFormData()
  addOrModifyDialogType.value = 'add'
  showAddOrModifyDialog.value = true
}

// 修改
const handleModify = function(row) {
  for (let key in formData.value) {
    formData.value[key] = row[key]
  }
  addOrModifyDialogType.value = 'modify'
  showAddOrModifyDialog.value = true
}

// 删除
const handleDelete = function(row) {
}

// 确定添加/修改
const handleConfirmAddOrModify = function() {
}


initQueryForm()
initFormData()
getRoleList()
</script>

<template>
  <div class="page_container role_container">
    <el-form :model="queryForm" label-width="auto" inline>
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
        <el-button type="primary" icon="icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="info" icon="icon-refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="operate_btn_group">
      <el-button type="primary" plain icon="icon-plus" @click="handleAdd">新增</el-button>
    </div>

    <el-table
      class="role_list_table"
      height="100%"
      :data="roleList"
      :header-cell-style="{
        background: '#F8F8F9',
        color: '#666'
      }"
      row-key="roleId"
    >
      <el-table-column label="角色编号" prop="roleId" align="center" width="100">
        <template #default="scope">
          <span>{{ scope.row.roleId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="name" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限字符" prop="perms" align="center" min-width="200">
        <template #default="scope">
          <span>{{ scope.row.perms }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" align="center" min-width="80">
        <template #default="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center" min-width="80">
        <template #default="scope">
          <el-tag type="" v-if="scope.row.status === '1'">正常</el-tag>
          <el-tag type="danger" v-if="scope.row.status === '0'">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建者" prop="creator" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.creator || '超级管理员' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" min-width="170">
        <template #default="scope">
          <span>{{ scope.row.createTime || '2023-10-01 07:07:07' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="" align="center" width="150">
        <template #default="scope">
          <el-button style="padding: 0 0;" type="primary" text icon="icon-edit" @click="handleModify(scope.row)">修改</el-button>
          <el-button style="padding: 0 0;" type="primary" text icon="icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="role_list_pagination"
      v-model:current-page="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :total="roleTotal"
      background
      layout="total, prev, pager, next, jumper"
    ></el-pagination>
  </div>

  <AddOrModify
    v-model="showAddOrModifyDialog"
    :type="addOrModifyDialogType"
    :form="formData"
    @confirm="handleConfirmAddOrModify"
  />
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