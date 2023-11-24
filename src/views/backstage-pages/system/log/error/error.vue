<script setup name="system:log:error">
import { reqErrorLogList } from '@/api/system/errorlog.js'

// 查询参数
const queryForm = ref({})
// 错误日志列表数据
const errorlogList = ref([])
// 错误日志数据总数
const dataTotal = ref(0)
// 表格组件实例
const errorlogTableRef = ref(null)
// 选择的数据
const selectRows = ref([])

// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 100,
    userName: '', // 用户名称
    ipAddr: '', // 错误地址
    errorLoc: '', // 错误地点
    status: '', // 错误状态
    errorTime: [], // 错误时间
  }
}

// 获取错误日志列表
const getErrorLogList = async function() {
  const params = JSON.parse(JSON.stringify(queryForm.value))
  const { result } = await reqErrorLogList(params)
  if (!result) return
  errorlogList.value = result.data || []
  dataTotal.value = result.total || 0
}

// 搜索
const handleSearch = function() {
  queryForm.value.pageNum = 1
  getErrorLogList()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getErrorLogList()
}

// 分页器页码改变时
const handlePaginationCurrChange = function(page) {
  queryForm.value.pageNum = page
  getErrorLogList()
}

// 分页器页数大小改变时
const handlePaginationSizeChange = function(size) {
  queryForm.value.pageSize = size
  getErrorLogList()
}

// 删除
const handleDelete = function(row) {
  ElMessageBox.confirm('确认删除所选错误日志?', '提示', {
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        setTimeout(() => {
          instance.confirmButtonLoading = false
          ElMessage.success('错误成功')
          done()
          getErrorLogList()
        }, 2000)
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 清空
const handleClearAll = function() {
  ElMessageBox.confirm('确认清空错误日志?', '提示', {
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        setTimeout(() => {
          instance.confirmButtonLoading = false
          ElMessage.success('错误成功')
          done()
          getErrorLogList()
        }, 2000)
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 点击表格行
const handleTableRowClick = function(row, column, event) {
  errorlogTableRef.value.toggleRowSelection(row)
}

// 当表格选择项发生变化时
const handleTableSelectionChange = function(selection) {
  selectRows.value = selection
}

initQueryForm()
getErrorLogList()
</script>

<template>
  <div class="page_container errorlog_page">
    <el-form :model="queryForm" label-width="auto" inline>
      <el-form-item label="用户名称:" prop="userName">
        <el-input
          style="width: 200px;"
          v-model="queryForm.userName"
          clearable
          placeholder="请输入用户名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="错误地址:" prop="ipAddr">
        <el-input
          style="width: 200px;"
          v-model="queryForm.ipAddr"
          clearable
          placeholder="请输入错误地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="错误地点:" prop="errorLoc">
        <el-input
          style="width: 200px;"
          v-model="queryForm.errorLoc"
          clearable
          placeholder="请输入错误地点"
        ></el-input>
      </el-form-item>
      <el-form-item label="错误状态:" prop="status">
        <el-select
          style="width: 150px;"
          v-model="queryForm.status"
          clearable
          placeholder="请选择"
        >
          <el-option label="成功" value="1"></el-option>
          <el-option label="失败" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="错误时间:" prop="errorTime">
        <el-date-picker
          style="width: 250px;"
          v-model="queryForm.errorTime"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="开始时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          unlink-panels
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="info" icon="icon-refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="operate_btn_group">
      <el-button type="danger" icon="icon-delete" plain :disabled="selectRows.length <= 0" @click="handleDelete">删除</el-button>
      <el-button type="danger" icon="icon-delete" plain @click="handleClearAll">清空</el-button>
    </div>

    <el-table
      class="errorlog_list_table"
      ref="errorlogTableRef"
      height="100%"
      :data="errorlogList"
      :header-cell-style="{
        background: '#F8F8F9',
        color: '#666'
      }"
      row-key="id"
      @row-click="handleTableRowClick"
      @selection-change="handleTableSelectionChange"
    >
      <el-table-column type="selection" align="center" width="60">
      </el-table-column>
      <el-table-column label="错误编号" prop="id" align="center" min-width="80">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名称" prop="userName" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="错误地址" prop="ipAddr" align="center" min-width="150">
        <template #default="scope">
          <span>{{ scope.row.ipAddr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="错误地点" prop="errorLoc" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.errorLoc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="浏览器" prop="browser" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.browser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作系统" prop="os" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.os }}</span>
        </template>
      </el-table-column>
      <el-table-column label="错误状态" prop="status" align="center" min-width="100">
        <template #default="scope">
          <el-tag type="" v-if="scope.row.status === '1'">成功</el-tag>
          <el-tag type="danger" v-if="scope.row.status === '0'">失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作信息" prop="msg" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.msg }}</span>
        </template>
      </el-table-column>
      <el-table-column label="错误时间" prop="errorTime" align="center" min-width="170">
        <template #default="scope">
          <span>{{ scope.row.errorTime }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="errorlog_list_pagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :total="dataTotal"
      @current-change="handlePaginationCurrChange"
      @size-change="handlePaginationSizeChange"
    />
  </div>
</template>

<style scoped lang="scss">
.errorlog_page {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;

  .operate_btn_group {
    margin-top: 10px;
  }

  .errorlog_list_table {
    margin-top: 10px;
  }

  .errorlog_list_pagination {
    margin-top: 10px;
    justify-content: flex-end;
  }
}
</style>