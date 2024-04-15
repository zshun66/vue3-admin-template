<script setup name="backstage:system:param">
import ParamFormDialog from './components/ParamFormDialog.vue'
import { reqParamListPage } from '@/api/system/param.js'

// 数据加载状态
const showLoading = ref(false)
// 查询参数
const queryForm = ref({})
// 参数列表数据
const paramList = ref([])
// 参数数据总数
const dataTotal = ref(0)
// 是否显示添加/修改弹框
const showParamFormDialog = ref(false)
// 添加/修改弹框类型(add添加、edit修改)
const dialogType = ref('add')
// 当前操作的行对象
const currRow = ref({})


// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 10,
    name: '', // 参数名称
    key: '', // 参数键名
    type: '', // 系统内置
    status: '', // 参数状态
  }
}

// 获取参数列表(分页)
const getParamListPage = async function() {
  const params = JSON.parse(JSON.stringify(queryForm.value))
  showLoading.value = true
  const { result } = await reqParamListPage(params)
  showLoading.value = false
  if (!result) return
  paramList.value = result.data.list || []
  dataTotal.value = result.data.total || 0
}

// 搜索
const handleSearch = function() {
  queryForm.value.pageNum = 1
  getParamListPage()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getParamListPage()
}

// 分页器页码改变时
const handlePaginationCurrChange = function(page) {
  queryForm.value.pageNum = page
  getParamListPage()
}

// 分页器页数大小改变时
const handlePaginationSizeChange = function(size) {
  queryForm.value.pageSize = size
  getParamListPage()
}

// 处理操作
const handleOperate = function(type, row) {
  dialogType.value = type
  currRow.value = row
  showParamFormDialog.value = true
}

// 删除
const handleDelete = function(row) {
  ElMessageBox.confirm('确认删除该参数?', '提示', {
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        setTimeout(() => {
          instance.confirmButtonLoading = false
          ElMessage.success('操作成功')
          done()
          getParamListPage()
        }, 2000)
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 添加/修改成功
const handleParamFormDialogSuccess = function() {
  getParamListPage()
}

initQueryForm()
getParamListPage()
</script>

<template>
  <div class="page_container param_page">
    <el-form :model="queryForm" label-width="auto" inline>
      <el-form-item label="参数名称:" prop="name">
        <el-input
          style="width: 200px;"
          v-model="queryForm.name"
          clearable
          placeholder="请输入参数名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="参数键名:" prop="key">
        <el-input
          style="width: 200px;"
          v-model="queryForm.key"
          clearable
          placeholder="请输入参数键名"
        ></el-input>
      </el-form-item>
      <el-form-item label="系统内置:" prop="type">
        <el-select
          style="width: 150px;"
          v-model="queryForm.type"
          clearable
          placeholder="请选择"
        >
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参数状态:" prop="status">
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
    </div>

    <el-table
      class="param_list_table"
      height="100%"
      :data="paramList"
      row-key="id"
      v-loading="showLoading"
    >
      <el-table-column label="参数名称" prop="name" align="center" min-width="200" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数键名" prop="key" align="center" min-width="150" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ scope.row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数键值" prop="value" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统内置" prop="type" align="center" min-width="80">
        <template #default="scope">
          <el-tag type="" v-if="scope.row.type === '1'">是</el-tag>
          <el-tag type="info" v-if="scope.row.type === '0'">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center" min-width="100">
        <template #default="scope">
          <el-tag type="" v-if="scope.row.status === '1'">正常</el-tag>
          <el-tag type="danger" v-if="scope.row.status === '0'">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" align="center" min-width="200" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ scope.row.remark }}</span>
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
          <div style="display: flex; align-items: center; justify-content: center;">
            <el-button style="padding: 0 0;" type="primary" text icon="Edit" @click.stop="handleOperate('edit', scope.row)">修改</el-button>
            <el-button style="padding: 0 0;" type="primary" text icon="Delete" @click.stop="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="param_list_pagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :total="dataTotal"
      @current-change="handlePaginationCurrChange"
      @size-change="handlePaginationSizeChange"
    />

    <ParamFormDialog
      v-model="showParamFormDialog"
      :type="dialogType"
      :row="currRow"
      @success="handleParamFormDialogSuccess"
    />
  </div>
</template>

<style scoped lang="scss">
.param_page {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;

  .operate_btn_group {
    margin-top: 10px;
  }

  .param_list_table {
    margin-top: 10px;
  }

  .param_list_pagination {
    margin-top: 10px;
    justify-content: flex-end;
  }
}
</style>