<script setup name="system:notice">
import NoticeFormDialog from './components/NoticeFormDialog.vue'
import { reqNoticeListPage } from '@/api/system/notice.js'

// 数据加载状态
const showLoading = ref(false)
// 查询参数
const queryForm = ref({})
// 参数列表数据
const paramList = ref([])
// 参数数据总数
const dataTotal = ref(0)
// 是否显示添加/修改弹框
const showNoticeFormDialog = ref(false)
// 添加/修改弹框类型(add添加、edit修改)
const dialogType = ref('add')
// 当前操作的行对象
const currRow = ref({})


// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 10,
    title: '', // 标题
    type: '', // 类型
    status: '', // 状态
  }
}

// 获取通知公告列表(分页)
const getNoticeListPage = async function() {
  const params = JSON.parse(JSON.stringify(queryForm.value))
  showLoading.value = true
  const { result } = await reqNoticeListPage(params)
  showLoading.value = false
  if (!result) return
  paramList.value = result.data.list || []
  dataTotal.value = result.data.total || 0
}

// 搜索
const handleSearch = function() {
  queryForm.value.pageNum = 1
  getNoticeListPage()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getNoticeListPage()
}

// 分页器页码改变时
const handlePaginationCurrChange = function(page) {
  queryForm.value.pageNum = page
  getNoticeListPage()
}

// 分页器页数大小改变时
const handlePaginationSizeChange = function(size) {
  queryForm.value.pageSize = size
  getNoticeListPage()
}

// 处理操作
const handleOperate = function(type, row) {
  dialogType.value = type
  currRow.value = row
  showNoticeFormDialog.value = true
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
          getNoticeListPage()
        }, 2000)
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 添加/修改成功
const handleNoticeFormDialogSuccess = function() {
  getNoticeListPage()
}

initQueryForm()
getNoticeListPage()
</script>

<template>
  <div class="page_container notice_page">
    <el-form :model="queryForm" label-width="auto" inline>
      <el-form-item label="标题:" prop="title">
        <el-input
          style="width: 200px;"
          v-model="queryForm.title"
          clearable
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="类型:" prop="type">
        <el-select
          style="width: 150px;"
          v-model="queryForm.type"
          clearable
          placeholder="请选择"
        >
          <el-option label="通知" value="1"></el-option>
          <el-option label="公告" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-select
          style="width: 150px;"
          v-model="queryForm.status"
          clearable
          placeholder="请选择"
        >
          <el-option label="正常" value="1"></el-option>
          <el-option label="关闭" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="info" icon="icon-refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="operate_btn_group">
      <el-button type="primary" icon="icon-plus" plain @click="handleOperate('add')">新增</el-button>
    </div>

    <el-table
      class="param_list_table"
      height="100%"
      :data="paramList"
      :header-cell-style="{
        background: '#F8F8F9',
        color: '#666'
      }"
      row-key="id"
      v-loading="showLoading"
    >
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title" align="center" min-width="250">
        <template #default="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type" align="center" min-width="100">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.type == '1'">通知</el-tag>
          <el-tag type="warning" v-if="scope.row.type == '2'">公告</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center" min-width="100">
        <template #default="scope">
          <el-tag type="" v-if="scope.row.status === '1'">正常</el-tag>
          <el-tag type="danger" v-if="scope.row.status === '0'">关闭</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" prop="creator" align="center" min-width="100">
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
            <el-button style="padding: 0 0;" type="primary" text icon="icon-edit" @click.stop="handleOperate('edit', scope.row)">修改</el-button>
            <el-button style="padding: 0 0;" type="primary" text icon="icon-delete" @click.stop="handleDelete(scope.row)">删除</el-button>
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
  </div>

  <NoticeFormDialog
    v-model="showNoticeFormDialog"
    :type="dialogType"
    :row="currRow"
    @success="handleNoticeFormDialogSuccess"
  />
</template>

<style scoped lang="scss">
.notice_page {
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