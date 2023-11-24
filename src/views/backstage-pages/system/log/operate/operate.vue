<script setup name="system:log:operate">
import { reqOperateLogList } from '@/api/system/operatelog.js'

// 操作类型选项
const operTypeOptions = ref([
  { label: '新增', value: '1' },
  { label: '修改', value: '2' },
  { label: '删除', value: '3' },
  { label: '授权', value: '4' },
  { label: '导出', value: '5' },
  { label: '导入', value: '6' },
  { label: '强退', value: '7' },
  { label: '生成代码', value: '8' },
  { label: '清空数据', value: '9' },
  { label: '其他', value: '0' },
])
// 查询参数
const queryForm = ref({})
// 操作日志列表数据
const operatelogList = ref([])
// 操作日志数据总数
const dataTotal = ref(0)
// 表格组件实例
const operatelogTableRef = ref(null)
// 选择的数据
const selectRows = ref([])

// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 100,
    title: '', // 系统模块
    operIp: '', // 操作地址
    operLoc: '', // 操作地点
    operName: '', // 操作人
    operType: '', // 操作类型
    status: '', // 操作状态
    operTime: [], // 操作时间
  }
}

// 获取操作日志列表
const getOperateLogList = async function() {
  const params = JSON.parse(JSON.stringify(queryForm.value))
  const { result } = await reqOperateLogList(params)
  if (!result) return
  operatelogList.value = result.data || []
  dataTotal.value = result.total || 0
}

// 搜索
const handleSearch = function() {
  queryForm.value.pageNum = 1
  getOperateLogList()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getOperateLogList()
}

// 分页器页码改变时
const handlePaginationCurrChange = function(page) {
  queryForm.value.pageNum = page
  getOperateLogList()
}

// 分页器页数大小改变时
const handlePaginationSizeChange = function(size) {
  queryForm.value.pageSize = size
  getOperateLogList()
}

// 删除
const handleDelete = function(row) {
  ElMessageBox.confirm('确认删除所选操作日志?', '提示', {
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        setTimeout(() => {
          instance.confirmButtonLoading = false
          ElMessage.success('操作成功')
          done()
          getOperateLogList()
        }, 2000)
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 清空
const handleClearAll = function() {
  ElMessageBox.confirm('确认清空操作日志?', '提示', {
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        setTimeout(() => {
          instance.confirmButtonLoading = false
          ElMessage.success('操作成功')
          done()
          getOperateLogList()
        }, 2000)
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 点击表格行
const handleTableRowClick = function(row, column, event) {
  operatelogTableRef.value.toggleRowSelection(row)
}

// 当表格选择项发生变化时
const handleTableSelectionChange = function(selection) {
  selectRows.value = selection
}

initQueryForm()
getOperateLogList()
</script>

<template>
  <div class="page_container operatelog_page">
    <el-form :model="queryForm" label-width="auto" inline>
      <el-form-item label="系统模块:" prop="title">
        <el-input
          style="width: 200px;"
          v-model="queryForm.title"
          clearable
          placeholder="请输入系统模块"
        ></el-input>
      </el-form-item>
      <el-form-item label="操作地址:" prop="operIp">
        <el-input
          style="width: 200px;"
          v-model="queryForm.operIp"
          clearable
          placeholder="请输入操作地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="操作地点:" prop="operLoc">
        <el-input
          style="width: 200px;"
          v-model="queryForm.operLoc"
          clearable
          placeholder="请输入操作地点"
        ></el-input>
      </el-form-item>
      <el-form-item label="操作人:" prop="operName">
        <el-input
          style="width: 200px;"
          v-model="queryForm.operName"
          clearable
          placeholder="请输入操作人"
        ></el-input>
      </el-form-item>
      <el-form-item label="操作类型:" prop="operType">
        <el-select
          style="width: 200px;"
          v-model="queryForm.operType"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in operTypeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作状态:" prop="status">
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
      <el-form-item label="操作时间:" prop="operTime">
        <el-date-picker
          style="width: 250px;"
          v-model="queryForm.operTime"
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
      class="operatelog_list_table"
      ref="operatelogTableRef"
      height="100%"
      :data="operatelogList"
      :header-cell-style="{
        background: '#F8F8F9',
        color: '#666'
      }"
      row-key="id"
      @row-click="handleTableRowClick"
      @selection-change="handleTableSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40">
      </el-table-column>
      <el-table-column label="日志编号" prop="id" align="center" min-width="80">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统模块" prop="title" align="center" min-width="80">
        <template #default="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作类型" prop="operType" align="center" min-width="80">
        <template #default="scope">
          <el-tag type="warning">{{ operTypeOptions.find(item => item.value === scope.row.operType).label }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作人员" prop="operName" align="center" min-width="80">
        <template #default="scope">
          <span>{{ scope.row.operName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作地址" prop="operIp" align="center" min-width="135">
        <template #default="scope">
          <span>{{ scope.row.operIp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作地点" prop="operLoc" align="center" min-width="120">
        <template #default="scope">
          <span>{{ scope.row.operLoc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消耗时间" prop="costTime" align="center" min-width="80">
        <template #default="scope">
          <span>{{ scope.row.costTime }}毫秒</span>
        </template>
      </el-table-column>
      <el-table-column label="操作状态" prop="status" align="center" min-width="80">
        <template #default="scope">
          <el-tag type="" v-if="scope.row.status === '1'">成功</el-tag>
          <el-tag type="danger" v-if="scope.row.status === '0'">失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" prop="operTime" align="center" min-width="170">
        <template #default="scope">
          <span>{{ scope.row.operTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求地址" prop="operUrl" align="center" min-width="200" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ scope.row.operUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求方法" prop="reqMethod" align="center" min-width="80">
        <template #default="scope">
          <span>{{ scope.row.reqMethod }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求参数" prop="operParam" align="center" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ scope.row.operParam }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作方法" prop="operMethod" align="center" min-width="200" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ scope.row.operMethod }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="operatelog_list_pagination"
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
.operatelog_page {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;

  .operate_btn_group {
    margin-top: 10px;
  }

  .operatelog_list_table {
    margin-top: 10px;
  }

  .operatelog_list_pagination {
    margin-top: 10px;
    justify-content: flex-end;
  }
}
</style>