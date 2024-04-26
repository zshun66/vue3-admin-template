<script setup name="UserFormDialog">
import { reqRoleListAll } from '@/api/system/role.js'
import { reqDeptListAll } from '@/api/system/dept.js'
import { reqPostListAll } from '@/api/system/post.js'
import { reqAddUser, reqUpdateUser } from '@/api/system/user.js'

const $props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'add'
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
// 角色数据
const roleList = ref([])
// 部门数据
const deptList = ref([])
// 岗位数据
const postList = ref([])
// 表单数据
const formData = ref(null)
// 表单数据验证规则
const formDataRules = ref({
  username: [
    { required: true, message: '请输入用户名称', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请输入显示排序', trigger: 'blur' }
  ],
  avatar: [
    { required: true, message: '请选择用户头像', trigger: 'change' }
  ],
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '请选择用户性别', trigger: 'change' }
  ],
  phone: [
    { required: true, message: '请输入用户电话号码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' }
  ],
  roleIds: [
    { required: true, message: '请选择用户所属角色', trigger: 'change' }
  ],
  deptId: [
    { required: true, message: '请选择用户所属部门', trigger: 'change' }
  ],
  postId: [
    { required: true, message: '请选择用户所属岗位', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择用户状态', trigger: 'change' }
  ],
  jump: [
    { required: true, message: '请输入跳转页面', trigger: 'blur' }
  ],
  remark: [],
})
// 表单实例
const userFormRef = ref(null)
// 部门树形组件实例
const deptTreeSelectRef = ref(null)
// 按钮加载态
const btnLoading = ref(false)


// 初始化表单数据
const initFormData = function() {
  formData.value = {
    username: '',
    password: '',
    sort: null,
    avatar: '',
    nickname: '',
    sex: '1',
    phone: '',
    email: '',
    roleIds: [],
    deptId: '',
    postId: '',
    status: '1',
    jump: '/backstage/home',
    remark: '',
  }
}

// 获取角色列表
const getRoleList = async function() {
  if (roleList.value.length > 0) return
  const params = {}
  const { result } = await reqRoleListAll(params)
  if (!result) return
  roleList.value = result.data || []
}

// 获取部门列表
const getDeptList = async function() {
  if (deptList.value.length > 0) return
  const params = {}
  const { result } = await reqDeptListAll(params)
  if (!result) return
  deptList.value = result.data || []
}

// 获取岗位列表
const getPostList = async function() {
  if (postList.value.length > 0) return
  const params = {}
  const { result } = await reqPostListAll(params)
  if (!result) return
  postList.value = result.data || []
}

// 取消
const handleCancel = function() {
  showDialog.value = false
}

// 确定
const handleConfirm = async function() {
  const valid = await userFormRef.value.validate().catch(err => {})
  if (!valid) return
  console.log(formData.value)
  btnLoading.value = true
  const data = JSON.parse(JSON.stringify(formData.value))
  let reqFn = $props.type === 'add' ? reqAddUser : reqUpdateUser
  const { result } = await reqFn(data)
  btnLoading.value = false
  if (!result) return
  showDialog.value = false
  ElMessage.success('操作成功')
  $emits('success')
}

// 打开弹框时
const handleDialogOpen = function() {
  getRoleList()
  getDeptList()
  getPostList()
  if ($props.type === 'add') {
    
  } else if ($props.type === 'edit') {
    for (let key in formData.value) {
      formData.value[key] = $props.row[key]
    }
    formData.value['roleIds'] = $props.row['roles'].map(item => item.id)
    formData.value['deptId'] = $props.row['dept'].id
    formData.value['postId'] = $props.row['post'].id
  }
}

// 关闭弹框时
const handleDialogClosed = function() {
  initFormData()
  userFormRef.value.resetFields()
}

// 当前所属部门选中节点变化时触发的事件
const handleTreeSelectCurrentChange = function(data, node) {
  formData.value.deptId = data.id
  deptTreeSelectRef.value.blur()
}

initFormData()
</script>

<template>
  <div class="comp_container user_form_dialog_comp">
    <el-dialog
      v-model="showDialog"
      width="650px"
      top="15vh"
      :append-to-body="false"
      :close-on-click-modal="false"
      :draggable="true"
      @open="handleDialogOpen"
      @closed="handleDialogClosed"
    >
      <template #header>
        <div v-if="type === 'add'">
          <span>添加用户</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
        <div v-if="type === 'edit'">
          <span>修改用户</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
      </template>

      <el-form class="form" ref="userFormRef" :model="formData" :rules="formDataRules" label-width="auto">
        <el-form-item label="用户名称:" prop="username">
          <el-input
            class="form_width"
            v-model="formData.username"
            clearable
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码:" prop="password">
          <el-input
            class="form_width"
            v-model="formData.password"
            type="password"
            clearable
            show-password
            placeholder="请输入用户密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="显示排序:" prop="sort">
          <el-input-number
            class="form_width"
            v-model="formData.sort"
            :min="0"
            step-strictly
            controls-position="right"
            placeholder="请输入显示排序"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="用户头像:" prop="avatar">
          <el-avatar
            style="margin-right: 8px; cursor: pointer;"
            :size="30"
            :src="formData.avatar"
          />
          <el-input
            style="width: 80%;"
            v-model="formData.avatar"
            clearable
            readonly
            placeholder="请选择用户头像"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称:" prop="nickname">
          <el-input
            class="form_width"
            v-model="formData.nickname"
            clearable
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户性别:" prop="sex">
          <el-select class="form_width" v-model="formData.sex">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码:" prop="phone">
          <el-input
            class="form_width"
            v-model="formData.phone"
            clearable
            placeholder="请输入用户电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱:" prop="email">
          <el-input
            class="form_width"
            v-model="formData.email"
            clearable
            placeholder="请输入用户邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属角色:" prop="roleIds">
          <el-select
            class="form_width"
            v-model="formData.roleIds"
            placeholder="请选择用户所属角色"
            multiple
            collapse-tags
            filterable
          >
            <el-option
              v-for="(role, index) in roleList"
              :key="index"
              :label="role.name"
              :value="role.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门:" prop="deptId">
          <el-tree-select
            class="form_width"
            ref="deptTreeSelectRef"
            v-model="formData.deptId"
            :data="deptList"
            node-key="id"
            render-after-expand
            :expand-on-click-node="false"
            :props="{
              label: 'name',
              children: 'children'
            }"
            filterable
            placeholder="请选择用户所属部门"
            @current-change="handleTreeSelectCurrentChange"
          ></el-tree-select>
        </el-form-item>
        <el-form-item label="所属岗位:" prop="postId">
          <el-select
            class="form_width"
            v-model="formData.postId"
            placeholder="请选择用户所属岗位"
            filterable
          >
            <el-option
              v-for="(post, index) in postList"
              :key="index"
              :label="post.name"
              :value="post.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态:" prop="status">
          <el-select class="form_width" v-model="formData.status">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 100%;" label="跳转页面:" prop="jump">
          <el-input
            class="form_width"
            v-model="formData.jump"
            clearable
            placeholder="请输入跳转页面"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%;" label="备注:" prop="remark">
          <el-input
            class="form_width"
            v-model="formData.remark"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 3 }"
            clearable
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="info" plain @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.user_form_dialog_comp {
  .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .form_width {
      width: 100%;
    }

    :deep(.el-form-item) {
      width: 48%;
    }

    :deep(.el-input__inner) {
      text-align: left;
    }
  }

  :deep(.el-dialog__footer) {
    text-align: center;
  }
}
</style>