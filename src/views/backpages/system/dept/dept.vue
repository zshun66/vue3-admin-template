<script setup name="backstage:system:dept">
import DeptFormDialog from './components/DeptFormDialog.vue'
import { reqDeptListPage, reqDeleteDept } from '@/api/system/dept.js'

// 数据加载状态
const showLoading = ref(false)
// 查询参数
const queryForm = ref({})
// 部门列表数据
const deptList = ref([])
// 部门数据总数
const dataTotal = ref(0)
// 表格实例
const deptTableRef = ref(null)
// 是否显示添加/修改弹框
const showDeptFormDialog = ref(false)
// 添加/修改弹框类型(add添加、edit修改)
const dialogType = ref('add')
// 当前操作的行对象
const currRow = ref({})


// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 10,
    name: '', // 部门名称
    status: '', // 部门状态
  }
}

// 获取部门列表(分页)
const getDeptListPage = async function() {
  const params = JSON.parse(JSON.stringify(queryForm.value))
  showLoading.value = true
  const { result } = await reqDeptListPage(params)
  showLoading.value = false
  if (!result) return
  deptList.value = result.data.list || []
  dataTotal.value = result.data.total || 0
  nextTick(() => handleCollapse())
}

// 搜索
const handleSearch = function() {
  queryForm.value.pageNum = 1
  getDeptListPage()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getDeptListPage()
}

// 分页器页码改变时
const handlePaginationCurrChange = function(page) {
  queryForm.value.pageNum = page
  getDeptListPage()
}

// 分页器页数大小改变时
const handlePaginationSizeChange = function(size) {
  queryForm.value.pageSize = size
  getDeptListPage()
}

// 处理操作
const handleOperate = function(type, row) {
  dialogType.value = type
  currRow.value = row
  showDeptFormDialog.value = true
}

// 删除
const handleDelete = function(row) {
  ElMessageBox.confirm('确认删除该部门?', '提示', {
    type: 'warning',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        const { result } = await reqDeleteDept()
        instance.confirmButtonLoading = false
        if (!result) return
        done()
        ElMessage.success('操作成功')
        getDeptListPage()
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 展开/折叠
const handleCollapse = function() {
  const loop = function(deptList) {
    deptList.forEach(dept => {
      deptTableRef.value.toggleRowExpansion(dept)
      if (dept.children && dept.children.length > 0) {
        loop(dept.children)
      }
    })
  }
  loop(deptList.value)
}

// 点击表格行
const handleTableRowClick = function(row, column, event) {
  if (row.children && row.children.length > 0) {
    deptTableRef.value.toggleRowExpansion(row)
  }
}

// 添加/修改成功
const handleDeptFormDialogSuccess = function() {
  getDeptListPage()
}

initQueryForm()
getDeptListPage()
</script>

<template>
  <div class="page_container dept_page">
    <el-form :model="queryForm" label-width="auto" inline>
      <el-form-item label="部门名称:" prop="name">
        <el-input
          style="width: 200px;"
          v-model="queryForm.name"
          clearable
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门状态:" prop="status">
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
      <el-button type="primary" icon="Plus" plain @click="handleOperate('add')">新增</el-button>
      <el-button type="info" icon="Switch" plain @click="handleCollapse">展开/折叠</el-button>
    </div>

    <el-table
      class="dept_list_table"
      ref="deptTableRef"
      height="100%"
      :data="deptList"
      row-key="id"
      :indent="0"
      v-loading="showLoading"
      @row-click="handleTableRowClick"
    >
      <el-table-column label="部门名称" prop="name" align="left" min-width="240" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" align="center" min-width="60">
        <template #default="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人" prop="head" align="center" min-width="100">
        <template #default="scope">
          <span>{{ scope.row.head }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" prop="telephone" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.telephone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" align="center" min-width="200">
        <template #default="scope">
          <span>{{ scope.row.email }}</span>
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
          <span>{{ scope.row.creator }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" min-width="170">
        <template #default="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="" align="center" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center;">
            <el-button style="padding: 0 0;" type="primary" text icon="Plus" @click.stop="handleOperate('add', scope.row)">新增</el-button>
            <el-button style="padding: 0 0;" type="primary" text icon="Edit" @click.stop="handleOperate('edit', scope.row)">修改</el-button>
            <el-button style="padding: 0 0;" type="primary" text icon="Delete" @click.stop="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="dept_list_pagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :total="dataTotal"
      @current-change="handlePaginationCurrChange"
      @size-change="handlePaginationSizeChange"
    />

    <DeptFormDialog
      v-model="showDeptFormDialog"
      :type="dialogType"
      :row="currRow"
      @success="handleDeptFormDialogSuccess"
    />
  </div>
</template>

<style scoped lang="scss">
.dept_page {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;

  .operate_btn_group {
    margin-top: 10px;
  }

  .dept_list_table {
    margin-top: 10px;
  }

  .dept_list_pagination {
    margin-top: 10px;
    justify-content: flex-end;
  }
}
</style>