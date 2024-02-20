<script setup name="system:menu">
import MenuFormDialog from './components/MenuFormDialog.vue'
import { reqMenuListPage } from '@/api/system/menu.js'

// 数据加载状态
const showLoading = ref(false)
// 查询参数
const queryForm = ref({})
// 菜单列表数据
const menuList = ref([])
// 菜单数据总数
const dataTotal = ref(0)
// 表格实例
const menuTableRef = ref(null)
// 是否显示添加/修改弹框
const showMenuFormDialog = ref(false)
// 添加/修改弹框类型(add添加、edit修改)
const dialogType = ref('add')
// 当前操作的行对象
const currRow = ref({})


// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 10,
    title: '', // 菜单标题
    status: '', // 菜单状态
  }
}

// 获取菜单列表(分页)
const getMenuListPage = async function() {
  const params = JSON.parse(JSON.stringify(queryForm.value))
  showLoading.value = true
  const { result } = await reqMenuListPage(params)
  showLoading.value = false
  if (!result) return
  menuList.value = result.data.list || []
  dataTotal.value = result.data.total || 0
}

// 搜索
const handleSearch = function() {
  queryForm.value.pageNum = 1
  getMenuListPage()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getMenuListPage()
}

// 分页器页码改变时
const handlePaginationCurrChange = function(page) {
  queryForm.value.pageNum = page
  getMenuListPage()
}

// 分页器页数大小改变时
const handlePaginationSizeChange = function(size) {
  queryForm.value.pageSize = size
  getMenuListPage()
}

// 处理操作
const handleOperate = function(type, row) {
  dialogType.value = type
  currRow.value = row
  showMenuFormDialog.value = true
}

// 删除
const handleDelete = function(row) {
  ElMessageBox.confirm('确认删除该菜单?', '提示', {
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        setTimeout(() => {
          instance.confirmButtonLoading = false
          ElMessage.success('操作成功')
          done()
          getMenuListPage()
        }, 2000)
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 展开/折叠
const handleCollapse = function() {
  const loop = function(menuList) {
    menuList.forEach(menu => {
      menuTableRef.value.toggleRowExpansion(menu)
      if (menu.children && menu.children.length > 0) {
        loop(menu.children)
      }
    })
  }
  loop(menuList.value)
}

// 点击表格行
const handleTableRowClick = function(row, column, event) {
  if (row.children && row.children.length > 0) {
    menuTableRef.value.toggleRowExpansion(row)
  }
}

// 添加/修改成功
const handleMenuFormDialogSuccess = function() {
  getMenuListPage()
}

initQueryForm()
getMenuListPage()
</script>

<template>
  <div class="page_container menu_page">
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
        <el-button type="primary" icon="Search" @click="handleSearch">搜索</el-button>
        <el-button type="info" icon="Refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="operate_btn_group">
      <el-button type="primary" icon="Plus" plain @click="handleOperate('add')">新增</el-button>
      <el-button type="info" icon="Switch" plain @click="handleCollapse">展开/折叠</el-button>
    </div>

    <el-table
      class="menu_list_table"
      ref="menuTableRef"
      height="100%"
      :data="menuList"
      row-key="id"
      :indent="0"
      v-loading="showLoading"
      @row-click="handleTableRowClick"
    >
      <el-table-column label="菜单标题" prop="title" align="left" min-width="150" show-overflow-tooltip>
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
          <svg-icon style="margin-top: 4px;" :name="scope.row.icon" color="#666" :size="scope.row.iconSize"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column label="权限字符" prop="perms" align="center" min-width="200">
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
      class="menu_list_pagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :total="dataTotal"
      @current-change="handlePaginationCurrChange"
      @size-change="handlePaginationSizeChange"
    />
  </div>

  <MenuFormDialog
    v-model="showMenuFormDialog"
    :type="dialogType"
    :menuTree="menuList"
    :row="currRow"
    @success="handleMenuFormDialogSuccess"
  />
</template>

<style scoped lang="scss">
.menu_page {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;

  .operate_btn_group {
    margin-top: 10px;
  }

  .menu_list_table {
    margin-top: 10px;
  }

  .menu_list_pagination {
    margin-top: 10px;
    justify-content: flex-end;
  }
}
</style>