<script setup name="system:dept:AddOrModify">
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
  type: [
    { required: true, message: '请选择部门类型', trigger: 'change' }
  ],
  sort: [
    { required: true, message: '请输入显示排序', trigger: 'blur' }
  ],
  title: [
    { required: true, message: '请输入部门标题', trigger: 'blur' }
  ],
  icon: [
    { required: true, message: '请输入部门图标', trigger: 'blur' }
  ],
  iconSize: [
    { required: true, message: '请输入图标大小', trigger: 'blur' }
  ],
  isLink: [
    { required: true, message: '请选择是否外链', trigger: 'change' }
  ],
  path: [
    { required: true, message: '请输入路由路径', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入路由名称', trigger: 'blur' }
  ],
  component: [
    { required: true, message: '请输入组件路径', trigger: 'blur' }
  ],
  perms: [
    { required: true, message: '请输入权限字符', trigger: 'blur' }
  ],
  isCache: [
    { required: true, message: '请选择是否缓存', trigger: 'change' }
  ],
  isVisible: [
    { required: true, message: '请选择显示状态', trigger: 'change' }
  ],
  isClearable: [
    { required: true, message: '请选择关闭状态', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择部门状态', trigger: 'change' }
  ],
})
// 部门树形数据
const deptTreeData = computed(() => {
  const result = [{}]
  result[0]['id'] = 0
  result[0]['title'] = '主类目'
  result[0]['children'] = $props.deptTree
  return result
})
// 表单实例
const addOrModifyFormRef = ref(null)
// 部门树选择器实例
const deptTreeSelectRef = ref(null)


// 初始化表单数据
const initFormData = function() {
  formData.value = {
    parentId: 0,
    type: 'directory',
    sort: null,
    title: '',
    icon: '',
    iconSize: '20px',
    isLink: '0',
    path: '',
    name: '',
    component: '',
    perms: '',
    isCache: '1',
    isVisible: '1',
    isClearable: '1',
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
  const valid = await addOrModifyFormRef.value.validate().catch(err => {})
  if (!valid) return
  console.log(formData.value)
  showDialog.value = false
  ElMessage.success('操作成功')
  $emits('success')
}

// 打开弹框时
const handleDialogOpen = function() {
  if ($props.type === 'add') {
    formData.value.parentId = ($props.row && $props.row.id) || 0
  } else if ($props.type === 'edit') {
    for (let key in formData.value) {
      formData.value[key] = $props.row[key]
    }
  }
}

// 关闭弹框时
const handleDialogClosed = function() {
  initFormData()
  addOrModifyFormRef.value.resetFields()
}

initFormData()
</script>

<template>
  <div class="comp_container addormodify_comp">
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

      <el-form class="form" ref="addOrModifyFormRef" :model="formData" :rules="formDataRules" label-width="auto">
        <el-form-item label="父级部门:" prop="parentId">
          <el-tree-select
            class="form_width"
            ref="deptTreeSelectRef"
            v-model="formData.parentId"
            :data="deptTreeData"
            node-key="id"
            render-after-expand
            :expand-on-click-node="false"
            :props="{
              label: 'title',
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
        <el-form-item label="部门标题:" prop="title">
          <el-input
            class="form_width"
            v-model="formData.title"
            clearable
            placeholder="请输入部门标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="显隐状态:" prop="isVisible" v-if="formData.type !== 'button'">
          <el-select class="form_width" v-model="formData.isVisible">
            <el-option label="显示" value="1"></el-option>
            <el-option label="隐藏" value="0"></el-option>
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
.addormodify_comp {
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

  :deep(.el-dialog) {
    border-radius: 7px;
  }

  :deep(.el-dialog__headerbtn) {
    top: 0px;
  }

  :deep(.el-dialog__body) {
    padding: 20px 35px 20px 30px;
  }

  :deep(.el-dialog__footer) {
    text-align: center;
  }
}
</style>