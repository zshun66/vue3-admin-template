<script setup name="_menu">
import AddOrModify from './components/AddOrModify/AddOrModify.vue'
import { reqMenuList } from '@/api/system/menu.js'

// 查询参数
const queryForm = ref({})
// 表单数据
const formData = ref({})
// 菜单数据
const menuList = ref([])
// 表格实例
const menuTableRef = ref(null)
// 是否显示添加/修改弹框
const showAddOrModifyDialog = ref(false)
// 添加/修改弹框类型
const addOrModifyDialogType = ref('add')


// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    title: '', // 菜单标题
    status: '', // 菜单状态
  }
}

// 初始化表单数据
const initFormData = function() {
  formData.value = {
    parentId: 0,
    icon: '',
    type: 'directory',
    title: '',
    sort: null,
    isLink: '0',
    path: '',
    component: '',
    perms: '',
    visible: '1',
    isCache: '1',
    status: '1',
  }
}

// 获取菜单列表
const getMenuList = async function() {
  const { result } = await reqMenuList(queryForm.value)
  if (!result) return
  menuList.value = result.data || []
}

// 搜索
const handleSearch = function() {
  getMenuList()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getMenuList()
}

// 新增
const handleAdd = function(parentId = 0) {
  initFormData()
  formData.value.parentId = parentId
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

// 展开/折叠
const handleCollapse = function() {
  menuTableRef.value.toggleRowExpansion(menuList.value[0])
}

// 点击表格行
const handleTableRowClick = function(row, column, event) {
  menuTableRef.value.toggleRowExpansion(row)
}

// 确定添加/修改
const handleConfirmAddOrModify = function() {
}

initQueryForm()
initFormData()
getMenuList()
</script>

<template>
  <div class="page_container menu_container">
    <el-form :model="queryForm" label-width="auto" inline>
      <el-form-item label="菜单标题:" prop="title">
        <el-input
          style="width: 200px;"
          v-model="queryForm.title"
          clearable
          placeholder="请输入菜单标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单状态:" prop="status">
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
      <el-button type="primary" icon="icon-plus" plain @click="handleAdd()">新增</el-button>
      <el-button type="info" icon="icon-switch" plain @click="handleCollapse">展开/折叠</el-button>
    </div>

    <el-table
      class="menu_list_table"
      ref="menuTableRef"
      height="100%"
      :data="menuList"
      :header-cell-style="{
        background: '#F8F8F9',
        color: '#666'
      }"
      row-key="menuId"
      :indent="0"
      @row-click="handleTableRowClick"
    >
      <el-table-column label="菜单标题" prop="title" align="left" min-width="120" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单类型" prop="type" align="center" min-width="80">
        <template #default="scope">
          <span v-if="scope.row.type === 'directory'">目录</span>
          <span v-if="scope.row.type === 'menu'">菜单</span>
          <span v-if="scope.row.type === 'button'">按钮</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" align="center" min-width="80">
        <template #default="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图标" prop="icon" align="center" min-width="80">
        <template #default="scope">
          <svg-icon style="margin-top: 4px;" :name="scope.row.icon" color="#666" size="20px"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column label="权限字符" prop="perms" align="center" min-width="150">
        <template #default="scope">
          <span>{{ scope.row.perms }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组价路径" prop="component" align="center" min-width="250" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ scope.row.component }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center" min-width="80">
        <template #default="scope">
          <el-tag type="" v-if="scope.row.status === '1'">正常</el-tag>
          <el-tag type="danger" v-if="scope.row.status === '0'">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建者" prop="creator" align="center" min-width="110">
        <template #default="scope">
          <span>{{ scope.row.creator || '超级管理员' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" min-width="170">
        <template #default="scope">
          <span>{{ scope.row.createTime || '2023-10-01 07:07:07' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="" align="center" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center;">
            <el-button style="padding: 0 0;" type="primary" text icon="icon-plus" @click.stop="handleAdd(scope.row.menuId)">新增</el-button>
            <el-button style="padding: 0 0;" type="primary" text icon="icon-edit" @click.stop="handleModify(scope.row)">修改</el-button>
            <el-button style="padding: 0 0;" type="primary" text icon="icon-delete" @click.stop="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <AddOrModify
    v-model="showAddOrModifyDialog"
    :type="addOrModifyDialogType"
    :form="formData"
    :menuTree="menuList"
    @confirm="handleConfirmAddOrModify"
  />
</template>

<style scoped lang="scss">
.menu_container {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;

  .operate_btn_group {
    margin-top: 10px;
  }

  .menu_list_table {
    margin-top: 10px;
  }
}
</style>