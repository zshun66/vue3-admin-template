<script setup name="system:dict:DictTypeDetail">
import DataAddOrModify from '../DataAddOrModify/DataAddOrModify.vue'
import { reqDictTypeListAll, reqDictDataListPage } from '@/api/system/dict.js'

const $props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  row: {
    type: Object,
    default: () => ({})
  }
})
const $emits = defineEmits([
  'update:modelValue',
  'confirm'
])

// 是否显示弹框
const showDialog = computed({
  get() {
    return $props.modelValue
  },
  set(value) {
    $emits('update:modelValue', value)
  }
})

// 数据加载状态
const showLoading = ref(false)
// 字典类型数据
const dictTypeList = ref([])
// 查询参数
const queryForm = ref({})
// 字典列表数据
const dictDataList = ref([])
// 字典数据总数
const dataTotal = ref(0)
// 是否显示字典类型添加/修改弹框
const showTypeAddOrModifyDialog = ref(false)
// 添加/修改弹框类型(add添加、edit修改)
const dialogType = ref('add')
// 当前操作的行对象
const currRow = ref({})


// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 10,
    typeId: $props.row.id, // 字典名称
    label: '', // 字典标签
    status: '', // 字典状态
  }
}

// 获取字典类型列表(全部)
const getDictTypeListAll = async function() {
  if (dictTypeList.value.length > 0) return
  const { result } = await reqDictTypeListAll()
  if (!result) return
  dictTypeList.value = result.data || []
}

// 获取字典数据列表(分页)
const getDictDataListPage = async function() {
  const params = JSON.parse(JSON.stringify(queryForm.value))
  showLoading.value = true
  const { result } = await reqDictDataListPage(params)
  showLoading.value = false
  if (!result) return
  dictDataList.value = result.data.list || []
  dataTotal.value = result.data.total || 0
}

// 搜索
const handleSearch = function() {
  queryForm.value.pageNum = 1
  getDictDataListPage()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getDictDataListPage()
}

// 分页器页码改变时
const handlePaginationCurrChange = function(page) {
  queryForm.value.pageNum = page
  getDictDataListPage()
}

// 分页器页数大小改变时
const handlePaginationSizeChange = function(size) {
  queryForm.value.pageSize = size
  getDictDataListPage()
}

// 处理操作
const handleOperate = function(type, row) {
  dialogType.value = type
  currRow.value = row
  showTypeAddOrModifyDialog.value = true
}

// 删除
const handleDelete = function(row) {
  ElMessageBox.confirm('确认删除该字典?', '提示', {
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        setTimeout(() => {
          instance.confirmButtonLoading = false
          ElMessage.success('操作成功')
          done()
          getDictDataListPage()
        }, 2000)
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 添加/修改成功
const handleAddOrModifySuccess = function() {
  getDictDataListPage()
}

// 打开弹框时
const handleDialogOpen = function() {
  initQueryForm()
  getDictTypeListAll()
  getDictDataListPage()
}

// 关闭弹框时
const handleDialogClosed = function() {
  initQueryForm()
}

initQueryForm()
</script>

<template>
  <div class="comp_container dicttypedetail_comp">
    <el-dialog
      v-model="showDialog"
      width="1200px"
      top="7vh"
      :append-to-body="false"
      :close-on-click-modal="true"
      :draggable="true"
      @open="handleDialogOpen"
      @closed="handleDialogClosed"
    >
      <template #header>
        <div>{{ row.name }} - 字典类型详情</div>
      </template>
      <el-form :model="queryForm" label-width="auto" inline>
        <el-form-item label="字典名称:" prop="typeId">
          <el-select
            style="width: 200px;"
            v-model="queryForm.typeId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in dictTypeList"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典标签:" prop="label">
          <el-input
            style="width: 200px;"
            v-model="queryForm.label"
            clearable
            placeholder="请输入字典标签"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典状态:" prop="status">
          <el-select
            style="width: 200px;"
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
        <el-button type="primary" icon="icon-plus" plain @click="handleOperate('add')">新增</el-button>
      </div>

      <el-table
        class="dict_list_table"
        height="100%"
        :data="dictDataList"
        :header-cell-style="{
          background: '#F8F8F9',
          color: '#666'
        }"
        v-loading="showLoading"
      >
        <el-table-column label="字典排序" prop="sort" align="center" width="120">
          <template #default="scope">
            <span>{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column label="字典标签" prop="label" align="center" min-width="150">
          <template #default="scope">
            <span>{{ scope.row.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="字典键值" prop="value" align="center" min-width="120">
          <template #default="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" align="center" min-width="180">
          <template #default="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" align="center" min-width="100">
          <template #default="scope">
            <el-tag type="" v-if="scope.row.status === '1'">正常</el-tag>
            <el-tag type="danger" v-if="scope.row.status === '0'">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建者" prop="creator" align="center" min-width="150">
          <template #default="scope">
            <span>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center" min-width="170">
          <template #default="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="" align="center" width="160">
          <template #default="scope">
            <div style="display: flex; align-items: center; justify-content: center;">
              <el-button style="padding: 0 0;" type="primary" text icon="icon-edit" @click.stop="handleOperate('edit', scope.row)">修改</el-button>
              <el-button style="padding: 0 0;" type="primary" text icon="icon-delete" @click.stop="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="dict_list_pagination"
        background
        layout="total, sizes, prev, pager, next, jumper"
        v-model:current-page="queryForm.pageNum"
        v-model:page-size="queryForm.pageSize"
        :total="dataTotal"
        @current-change="handlePaginationCurrChange"
        @size-change="handlePaginationSizeChange"
      />

      <DataAddOrModify
        v-model="showTypeAddOrModifyDialog"
        :type="dialogType"
        :outRow="row"
        :curRow="currRow"
        @success="handleAddOrModifySuccess"
      />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.dicttypedetail_comp {

  :deep(.el-dialog) {
    border-radius: 7px;
  }

  :deep(.el-dialog__headerbtn) {
    top: 0px;
  }

  :deep(.el-dialog__body) {
    padding: 20px 20px;
    height: 80vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .operate_btn_group {
    margin-top: 10px;
  }

  .dict_list_table {
    margin-top: 10px;
  }

  .dict_list_pagination {
    margin-top: 10px;
    justify-content: flex-end;
  }
}
</style>