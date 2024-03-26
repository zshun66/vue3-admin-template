<script setup name="PostFormDialog">
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
// 表单数据
const formData = ref(null)
// 表单数据验证规则
const formDataRules = ref({
  name: [
    { required: true, message: '请输入岗位名称', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入岗位编码', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请输入显示排序', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择岗位状态', trigger: 'change' }
  ],
  remark: [],
})
// 表单实例
const postFormRef = ref(null)


// 初始化表单数据
const initFormData = function() {
  formData.value = {
    name: '',
    code: '',
    sort: null,
    status: '1',
    remark: ''
  }
}

// 取消
const handleCancel = function() {
  showDialog.value = false
}

// 确定
const handleConfirm = async function() {
  const valid = await postFormRef.value.validate().catch(err => {})
  if (!valid) return
  console.log(formData.value)
  showDialog.value = false
  ElMessage.success('操作成功')
  $emits('success')
}

// 打开弹框时
const handleDialogOpen = function() {
  if ($props.type === 'add') {
    
  } else if ($props.type === 'edit') {
    for (let key in formData.value) {
      formData.value[key] = $props.row[key]
    }
  }
}

// 关闭弹框时
const handleDialogClosed = function() {
  initFormData()
  postFormRef.value.resetFields()
}

initFormData()
</script>

<template>
  <div class="comp_container post_form_dialog_comp">
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
          <span>添加岗位</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
        <div v-if="type === 'edit'">
          <span>修改岗位</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
      </template>

      <el-form class="form" ref="postFormRef" :model="formData" :rules="formDataRules" label-width="auto">
        <el-form-item label="岗位名称:" prop="name">
          <el-input
            class="form_width"
            v-model="formData.name"
            clearable
            placeholder="请输入岗位名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="岗位编码:" prop="code">
          <el-input
            class="form_width"
            v-model="formData.code"
            clearable
            placeholder="请输入岗位编码"
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
        <el-form-item label="岗位状态:" prop="status">
          <el-select class="form_width" v-model="formData.status">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
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
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.post_form_dialog_comp {
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