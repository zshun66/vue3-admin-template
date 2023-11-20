<script setup name="system:user">
import AddOrModify from './components/AddOrModify/AddOrModify.vue'
import { reqUserList } from '@/api/system/user.js'
import { reqDeptList } from '@/api/system/dept.js'

// 部门过滤文本
const filterDeptText = ref('')
// 部门树数据
const deptTree = ref([])
// 部门树组件实例
const deptTreeRef = ref(null)
// 查询参数
const queryForm = ref({})
// 用户列表数据
const userList = ref([])
// 用户数据总数
const dataTotal = ref(0)
// 是否显示添加/修改弹框
const showAddOrModifyDialog = ref(false)
// 添加/修改弹框类型(add添加、edit修改)
const dialogType = ref('add')
// 当前操作的行对象
const currRow = ref({})


// 获取部门列表
const getDeptList = async function() {
  const params = {}
  const { result } = await reqDeptList(params)
  if (!result) return
  deptTree.value = result.data || []
}

// 过滤部门方法
const filterDeptNodeMethod = function(value, data) {
  if (!value) return true
  return data.name.includes(value)
}

watch(filterDeptText, (newv, oldv) => {
  deptTreeRef.value.filter(newv)
})

// 当前选中节点变化时触发的事件
const handleTreeCurrentChange = function(data, node) {
  console.log(data, node)
}

// 初始化查询参数
const initQueryForm = function() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 100,
    username: '', // 用户名称
    nickname: '', // 用户昵称
    phone: '', // 手机号码
    email: '', // 邮箱
    status: '', // 用户状态
    createTime: [], // 创建时间
  }
}

// 获取用户列表
const getUserList = async function() {
  const params = JSON.parse(JSON.stringify(queryForm.value))
  params['startDate'] = (params.createTime && params.createTime[0]) || ''
  params['endDate'] = (params.createTime && params.createTime[1]) || ''
  delete params['createTime']
  const { result } = await reqUserList(params)
  if (!result) return
  userList.value = result.data || []
  dataTotal.value = result.total || 0
}

// 搜索
const handleSearch = function() {
  queryForm.value.pageNum = 1
  getUserList()
}

// 重置
const handleReset = function() {
  initQueryForm()
  getUserList()
}

// 分页器页码改变时
const handlePaginationCurrChange = function(page) {
  queryForm.value.pageNum = page
  getUserList()
}

// 分页器页数大小改变时
const handlePaginationSizeChange = function(size) {
  queryForm.value.pageSize = size
  getUserList()
}

// 处理操作
const handleOperate = function(type, row) {
  dialogType.value = type
  currRow.value = row
  showAddOrModifyDialog.value = true
}

// 删除
const handleDelete = function(row) {
  ElMessageBox.confirm('确认删除该用户?', '提示', {
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        setTimeout(() => {
          instance.confirmButtonLoading = false
          ElMessage.success('操作成功')
          done()
          getUserList()
        }, 2000)
      } else if (action !== 'confirm') {
        if (!instance.confirmButtonLoading) done()
      }
    }
  }).catch(err => {})
}

// 添加/修改成功
const handleAddOrModifySuccess = function() {
  getUserList()
}

// 用户状态切换
const handleStatusBeforeChange = function(row) {
  return function() {
    row.loading = true
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        row.loading = false
        resolve(true)
      }, 500)
    })
  }
}

getDeptList()
initQueryForm()
getUserList()
</script>

<template>
  <div class="page_container user_page">
    <div class="left_box">
      <el-input v-model="filterDeptText" placeholder="请输入" clearable />

      <el-tree
        class="dept_tree"
        ref="deptTreeRef"
        :data="deptTree"
        node-key="id"
        :props="{
          label: 'name',
          children: 'children'
        }"
        default-expand-all
        :expand-on-click-node="false"
        highlight-current
        :filter-node-method="filterDeptNodeMethod"
        @current-change="handleTreeCurrentChange"
      ></el-tree>
    </div>
    <div class="right_box">
      <el-form :model="queryForm" label-width="auto" inline>
        <el-form-item label="用户名称:" prop="username">
          <el-input
            style="width: 200px;"
            v-model="queryForm.username"
            clearable
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称:" prop="nickname">
          <el-input
            style="width: 200px;"
            v-model="queryForm.nickname"
            clearable
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input
            style="width: 200px;"
            v-model="queryForm.phone"
            clearable
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input
            style="width: 200px;"
            v-model="queryForm.email"
            clearable
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户状态:" prop="status">
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
        <el-form-item label="创建时间:" prop="email">
          <el-date-picker
            style="width: 250px;"
            v-model="queryForm.createTime"
            type="daterange"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            unlink-panels
          ></el-date-picker>
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
        class="user_list_table"
        height="100%"
        :data="userList"
        :header-cell-style="{
          background: '#F8F8F9',
          color: '#666'
        }"
        row-key="id"
      >
        <el-table-column label="用户编号" prop="id" align="center" min-width="80">
          <template #default="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名称" prop="username" align="center" min-width="120">
          <template #default="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort" align="center" min-width="80">
          <template #default="scope">
            <span>{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户昵称" prop="nickname" align="center" min-width="150">
          <template #default="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户头像" prop="avatar" align="center" min-width="100">
          <template #default="scope">
            <el-avatar style="position: relative; top: 3px;" :size="30" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column label="用户性别" prop="sex" align="center" min-width="100">
          <template #default="scope">
            <span v-if="scope.row.sex === '1'">男</span>
            <span v-if="scope.row.sex === '0'">女</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" prop="phone" align="center" min-width="120">
          <template #default="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" prop="email" align="center" min-width="180">
          <template #default="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属角色" prop="roles" align="center" min-width="150">
          <template #default="scope">
            <span>{{ scope.row.roles.map(item => item.name) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属部门" prop="dept" align="center" min-width="180">
          <template #default="scope">
            <span>{{ scope.row.dept.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属岗位" prop="post" align="center" min-width="180">
          <template #default="scope">
            <span>{{ scope.row.post.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" align="center" min-width="200">
          <template #default="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" align="center" min-width="80">
          <template #default="scope">
            <el-switch
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #FF4949;"
              v-model="scope.row.status"
              active-value="1"
              inactive-value="0"
              active-text="正常"
              inactive-text="禁用"
              inline-prompt
              :loading="scope.row.loading"
              :before-change="handleStatusBeforeChange(scope.row)"
            />
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
        <el-table-column label="操作" prop="" align="center" width="140">
          <template #default="scope">
            <div style="display: flex; align-items: center; justify-content: center;">
              <el-button style="padding: 0 0;" type="primary" text icon="icon-edit" @click.stop="handleOperate('edit', scope.row)">修改</el-button>
              <el-button style="padding: 0 0;" type="primary" text icon="icon-delete" @click.stop="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="user_list_pagination"
        background
        layout="total, sizes, prev, pager, next, jumper"
        v-model:current-page="queryForm.pageNum"
        v-model:page-size="queryForm.pageSize"
        :total="dataTotal"
        @current-change="handlePaginationCurrChange"
        @size-change="handlePaginationSizeChange"
      />
    </div>
  </div>

  <AddOrModify
    v-model="showAddOrModifyDialog"
    :type="dialogType"
    :row="currRow"
    @success="handleAddOrModifySuccess"
  />
</template>

<style scoped lang="scss">
.user_page {
  padding: 20px 20px;
  display: flex;
  align-items: flex-start;
  overflow-x: hidden;

  .left_box {
    margin-right: 20px;
    min-width: 250px;

    .dept_tree {
      margin-top: 15px;
    }
  }

  .right_box {
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    .operate_btn_group {
      margin-top: 10px;
    }

    .user_list_table {
      margin-top: 10px;
    }

    .user_list_pagination {
      margin-top: 10px;
      justify-content: flex-end;
    }
  }
}
</style>