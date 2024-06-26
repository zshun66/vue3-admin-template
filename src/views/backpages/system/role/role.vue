<script setup name="backstage:system:role">
import RoleFormDialog from './components/RoleFormDialog.vue'
import { reqRoleListPage, reqDeleteRole } from '@/api/system/role.js'

// 数据加载状态
const showLoading = ref(false)
// 查询参数
const queryForm = ref({})
// 角色列表数据
const roleList = ref([])
// 菜单数据总数
const dataTotal = ref(0)
// 是否显示添加/修改弹框
const showRoleFormDialog = ref(false)
// 添加/修改弹框类型(add添加、edit修改)
const dialogType = ref('add')
// 当前操作的行对象
const currRow = ref({})


// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 10,
    name: '', // 角色名称
    status: '', // 角色状态
  }
}

// 获取角色列表(分页)
const getRoleListPage = async function() {
  const params = JSON.parse(JSON.stringify(queryForm.value))
  showLoading.value = true
  const { result } = await reqRoleListPage(params)
  showLoading.value = false
  if (!result) return
  roleList.value = result.data.list || []
  dataTotal.value = result.data.total || 0
}

// 搜索
const handleSearch = function() {
  queryForm.value.pageNum = 1
  getRoleListPage()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getRoleListPage()
}

// 分页器页码改变时
const handlePaginationCurrChange = function(page) {
  queryForm.value.pageNum = page
  getRoleListPage()
}

// 分页器页数大小改变时
const handlePaginationSizeChange = function(size) {
  queryForm.value.pageSize = size
  getRoleListPage()
}

// 处理操作
const handleOperate = function(type, row) {
  dialogType.value = type
  currRow.value = row
  showRoleFormDialog.value = true
}

// 删除
const handleDelete = function(row) {
  ElMessageBox.confirm('确认删除该角色?', '提示', {
    type: 'warning',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        const { result } = await reqDeleteRole()
        instance.confirmButtonLoading = false
        if (!result) return
        done()
        ElMessage.success('操作成功')
        getRoleListPage()
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 添加/修改成功
const handleRoleFormDialogSuccess = function() {
  getRoleListPage()
}

initQueryForm()
getRoleListPage()
</script>

<template>
  <div class="page_container role_page">
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
        <el-button type="primary" icon="Search" @click="handleSearch">搜索</el-button>
        <el-button type="info" icon="Refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="operate_btn_group">
      <el-button type="primary" plain icon="Plus" @click="handleOperate('add')">新增</el-button>
    </div>

    <el-table
      class="role_list_table"
      height="100%"
      :data="roleList"
      row-key="id"
      v-loading="showLoading"
    >
      <el-table-column label="角色编号" prop="id" align="center" width="100">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="name" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限字符" prop="perms" align="center" min-width="150">
        <template #default="scope">
          <span>{{ scope.row.perms }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" align="center" min-width="80">
        <template #default="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" align="center" min-width="150">
        <template #default="scope">
          <span>{{ scope.row.remark }}</span>
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
          <span>{{ scope.row.creator }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" min-width="170">
        <template #default="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="" align="center" width="150">
        <template #default="scope">
          <el-button style="padding: 0 0;" type="primary" text icon="Edit" @click="handleOperate('edit', scope.row)">修改</el-button>
          <el-button style="padding: 0 0;" type="primary" text icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="role_list_pagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :total="dataTotal"
      @current-change="handlePaginationCurrChange"
      @size-change="handlePaginationSizeChange"
    />

    <RoleFormDialog
      v-model="showRoleFormDialog"
      :type="dialogType"
      :row="currRow"
      @success="handleRoleFormDialogSuccess"
    />
  </div>
</template>

<style scoped lang="scss">
.role_page {
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