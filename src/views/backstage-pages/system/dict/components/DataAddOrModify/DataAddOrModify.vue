<script setup name="system:dict:DataAddOrModify">
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
  type: [
    { required: true, message: '请输入字典类型', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请输入显示排序', trigger: 'blur' }
  ],
  value: [
    { required: true, message: '请输入数据键值', trigger: 'blur' }
  ],
  label: [
    { required: true, message: '请输入数据标签', trigger: 'blur' }
  ],
  cssStyle: [],
  status: [
    { required: true, message: '请选择字典状态', trigger: 'change' }
  ],
  remark: [],
})
// 数据标签回显样式
const cssStyleOptions = ref([
  { value: 'default', label: '默认' }, 
  { value: 'primary', label: '主要' }, 
  { value: 'success', label: '成功' },
  { value: 'info', label: '信息' },
  { value: 'warning', label: '警告' },
  { value: 'danger', label: '危险' }
])
// 表单实例
const dataAddOrModifyFormRef = ref(null)


// 初始化表单数据
const initFormData = function() {
  formData.value = {
    type: '',
    sort: null,
    value: '',
    label: '',
    cssStyle: '',
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
  const valid = await dataAddOrModifyFormRef.value.validate().catch(err => {})
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
  dataAddOrModifyFormRef.value.resetFields()
}

initFormData()
</script>

<template>
  <div class="comp_container dataaddormodify_comp">
    <el-dialog
      v-model="showDialog"
      width="450px"
      top="15vh"
      :append-to-body="false"
      :close-on-click-modal="false"
      :draggable="true"
      @open="handleDialogOpen"
      @closed="handleDialogClosed"
    >
      <template #header>
        <div v-if="type === 'add'">
          <span>添加字典</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
        <div v-if="type === 'edit'">
          <span>修改字典</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
      </template>

      <el-form class="form" ref="dataAddOrModifyFormRef" :model="formData" :rules="formDataRules" label-width="auto">
        <el-form-item label="字典类型:" prop="type">
          <el-input
            class="form_width"
            v-model="formData.type"
            clearable
            disabled
            placeholder="请输入字典类型"
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
        <el-form-item label="数据键值:" prop="value">
          <el-input
            class="form_width"
            v-model="formData.value"
            clearable
            placeholder="请输入数据键值"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据标签:" prop="label">
          <el-input
            class="form_width"
            v-model="formData.label"
            clearable
            placeholder="请输入数据标签"
          ></el-input>
        </el-form-item>
        <el-form-item label="回显样式:" prop="cssStyle">
          <el-select
            class="form_width"
            v-model="formData.cssStyle"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in cssStyleOptions"
              :key="index"
              :value="item.value"
              :label="`${item.label}(${item.value})`"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典状态:" prop="status">
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
            :autosize="{ minRows: 3, maxRows: 5 }"
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
.dataaddormodify_comp {
  .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .form_width {
      width: 100%;
    }

    :deep(.el-form-item) {
      width: 100%;
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
    padding: 20px 35px 20px 30px !important;
    height: auto !important;
  }

  :deep(.el-dialog__footer) {
    text-align: center;
  }
}
</style>