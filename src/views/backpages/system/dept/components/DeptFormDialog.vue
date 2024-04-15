<script setup name="DeptFormDialog">
const $props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'add'
  },
  deptTree: {
    type: Array,
    default: () => ([])
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
// 表单数据
const formData = ref(null)
// 表单数据验证规则
const formDataRules = ref({
  parentId: [
    { required: true, message: '请选择父级部门', trigger: 'change' }
  ],
  sort: [
    { required: true, message: '请输入显示排序', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' }
  ],
  head: [],
  telephone: [],
  email: [],
  status: [
    { required: true, message: '请选择部门状态', trigger: 'change' }
  ],
})
// 表单实例
const deptFormRef = ref(null)
// 部门树选择器实例
const deptTreeSelectRef = ref(null)


// 初始化表单数据
const initFormData = function() {
  formData.value = {
    parentId: '',
    sort: null,
    name: '',
    head: '',
    telephone: '',
    email: '',
    status: '1',
  }
}

// 当前选中节点变化时触发的事件
const handleTreeSelectCurrentChange = function(data, node) {
  formData.value.parentId = data.id
  deptTreeSelectRef.value.blur()
}

// 取消
const handleCancel = function() {
  showDialog.value = false
}

// 确定
const handleConfirm = async function() {
  const valid = await deptFormRef.value.validate().catch(err => {})
  if (!valid) return
  console.log(formData.value)
  showDialog.value = false
  ElMessage.success('操作成功')
  $emits('success')
}

// 打开弹框时
const handleDialogOpen = function() {
  if ($props.type === 'add') {
    formData.value.parentId = ($props.row && $props.row.id) || ''
  } else if ($props.type === 'edit') {
    for (let key in formData.value) {
      formData.value[key] = $props.row[key]
    }
  }
}

// 关闭弹框时
const handleDialogClosed = function() {
  initFormData()
  deptFormRef.value.resetFields()
}

initFormData()
</script>

<template>
  <div class="comp_container dept_form_dialog_comp">
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
          <span>添加部门</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
        <div v-if="type === 'edit'">
          <span>修改部门</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
      </template>

      <el-form class="form" ref="deptFormRef" :model="formData" :rules="formDataRules" label-width="auto">
        <el-form-item style="width: 100%;" label="父级部门:" prop="parentId">
          <el-tree-select
            class="form_width"
            ref="deptTreeSelectRef"
            v-model="formData.parentId"
            :data="deptTree"
            node-key="id"
            render-after-expand
            :expand-on-click-node="false"
            :props="{
              label: 'name',
              children: 'children'
            }"
            placeholder="请选择上级部门"
            @current-change="handleTreeSelectCurrentChange"
          ></el-tree-select>
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
        <el-form-item label="部门名称:" prop="name">
          <el-input
            class="form_width"
            v-model="formData.name"
            clearable
            placeholder="请输入部门名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人:" prop="head">
          <el-input
            class="form_width"
            v-model="formData.head"
            clearable
            placeholder="请输入负责人"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="telephone">
          <el-input
            class="form_width"
            v-model="formData.telephone"
            clearable
            placeholder="请输入联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input
            class="form_width"
            v-model="formData.email"
            clearable
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门状态:" prop="status">
          <el-select class="form_width" v-model="formData.status">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="info" plain @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.dept_form_dialog_comp {
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