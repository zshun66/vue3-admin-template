<script setup name="system:log:loginlog">
import { reqLoginLogListPage } from '@/api/system/log.js'

// 数据加载状态
const showLoading = ref(false)
// 查询参数
const queryForm = ref({})
// 登录日志列表数据
const loginlogList = ref([])
// 登录日志数据总数
const dataTotal = ref(0)
// 表格组件实例
const loginlogTableRef = ref(null)
// 选择的数据
const selectRows = ref([])

// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 10,
    nickname: '', // 用户昵称
    username: '', // 用户名称
    ipAddr: '', // 登录地址
    loginLoc: '', // 登录地点
    status: '', // 登录状态
    loginTime: [], // 登录时间
  }
}

// 获取登录日志列表(分页)
const getLoginLogListPage = async function() {
  const params = JSON.parse(JSON.stringify(queryForm.value))
  params.startLoginTime = (params.loginTime && params.loginTime[0]) || ''
  params.endLoginTime = (params.loginTime && params.loginTime[1]) || ''
  delete params.loginTime
  showLoading.value = true
  const { result } = await reqLoginLogListPage(params)
  showLoading.value = false
  if (!result) return
  loginlogList.value = result.data.list || []
  dataTotal.value = result.data.total || 0
}

// 搜索
const handleSearch = function() {
  queryForm.value.pageNum = 1
  getLoginLogListPage()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getLoginLogListPage()
}

// 分页器页码改变时
const handlePaginationCurrChange = function(page) {
  queryForm.value.pageNum = page
  getLoginLogListPage()
}

// 分页器页数大小改变时
const handlePaginationSizeChange = function(size) {
  queryForm.value.pageSize = size
  getLoginLogListPage()
}

// 删除
const handleDelete = function(row) {
  ElMessageBox.confirm('确认删除所选登录日志?', '提示', {
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        setTimeout(() => {
          instance.confirmButtonLoading = false
          ElMessage.success('操作成功')
          done()
          getLoginLogListPage()
        }, 2000)
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 清空
const handleClearAll = function() {
  ElMessageBox.confirm('确认清空登录日志?', '提示', {
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        setTimeout(() => {
          instance.confirmButtonLoading = false
          ElMessage.success('操作成功')
          done()
          getLoginLogListPage()
        }, 2000)
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 点击表格行
const handleTableRowClick = function(row, column, event) {
  loginlogTableRef.value.toggleRowSelection(row)
}

// 当表格选择项发生变化时
const handleTableSelectionChange = function(selection) {
  selectRows.value = selection
}

initQueryForm()
getLoginLogListPage()
</script>

<template>
  <div class="page_container loginlog_page">
    <el-form :model="queryForm" label-width="auto" inline>
      <el-form-item label="用户昵称:" prop="nickname">
        <el-input
          style="width: 200px;"
          v-model="queryForm.nickname"
          clearable
          placeholder="请输入用户昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名称:" prop="username">
        <el-input
          style="width: 200px;"
          v-model="queryForm.username"
          clearable
          placeholder="请输入用户名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="登录地址:" prop="ipAddr">
        <el-input
          style="width: 200px;"
          v-model="queryForm.ipAddr"
          clearable
          placeholder="请输入登录地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="登录地点:" prop="loginLoc">
        <el-input
          style="width: 200px;"
          v-model="queryForm.loginLoc"
          clearable
          placeholder="请输入登录地点"
        ></el-input>
      </el-form-item>
      <el-form-item label="登录状态:" prop="status">
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
      <el-form-item label="登录时间:" prop="loginTime">
        <el-date-picker
          style="width: 250px;"
          v-model="queryForm.loginTime"
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
        <el-button type="primary" icon="Search" @click="handleSearch">搜索</el-button>
        <el-button type="info" icon="Refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="operate_btn_group">
      <el-button type="danger" icon="Delete" plain :disabled="selectRows.length <= 0" @click="handleDelete">删除</el-button>
      <el-button type="danger" icon="Delete" plain @click="handleClearAll">清空</el-button>
    </div>

    <el-table
      class="loginlog_list_table"
      ref="loginlogTableRef"
      height="100%"
      :data="loginlogList"
      row-key="id"
      v-loading="showLoading"
      @row-click="handleTableRowClick"
      @selection-change="handleTableSelectionChange"
    >
      <el-table-column type="selection" align="center" width="60">
      </el-table-column>
      <el-table-column label="登录编号" prop="id" align="center" min-width="80">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" prop="nickname" align="center" min-width="80">
        <template #default="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名称" prop="username" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录地址" prop="ipAddr" align="center" min-width="150">
        <template #default="scope">
          <span>{{ scope.row.ipAddr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录地点" prop="loginLoc" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.loginLoc }}</span>
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
      <el-table-column label="登录状态" prop="status" align="center" min-width="100">
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
      <el-table-column label="登录时间" prop="loginTime" align="center" min-width="170">
        <template #default="scope">
          <span>{{ scope.row.loginTime }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="loginlog_list_pagination"
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
.loginlog_page {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;

  .operate_btn_group {
    margin-top: 10px;
  }

  .loginlog_list_table {
    margin-top: 10px;
  }

  .loginlog_list_pagination {
    margin-top: 10px;
    justify-content: flex-end;
  }
}
</style>