<script setup name="NoticeFormDialog">
import { reqAddNotice, reqUpdateNotice } from '@/api/system/notice.js'

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
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择类型', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ],
  content: [],
  remark: [],
})
// 表单实例
const noticeFormRef = ref(null)
// 按钮加载态
const btnLoading = ref(false)


// 初始化表单数据
const initFormData = function() {
  formData.value = {
    title: '',
    type: '1',
    status: '1',
    content: '',
    remark: ''
  }
}

// 取消
const handleCancel = function() {
  showDialog.value = false
}

// 确定
const handleConfirm = async function() {
  const valid = await noticeFormRef.value.validate().catch(err => {})
  if (!valid) return
  console.log(formData.value)
  btnLoading.value = true
  const data = JSON.parse(JSON.stringify(formData.value))
  let reqFn = $props.type === 'add' ? reqAddNotice : reqUpdateNotice
  const { result } = await reqFn(data)
  btnLoading.value = false
  if (!result) return
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
  noticeFormRef.value.resetFields()
}

initFormData()
</script>

<template>
  <div class="comp_container notice_form_dialog_comp">
    <el-dialog
      v-model="showDialog"
      width="1000px"
      top="5vh"
      :append-to-body="false"
      :close-on-click-modal="false"
      :draggable="true"
      @open="handleDialogOpen"
      @closed="handleDialogClosed"
    >
      <template #header>
        <div v-if="type === 'add'">
          <span>添加通知公告</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
        <div v-if="type === 'edit'">
          <span>修改通知公告</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
      </template>

      <el-form class="form" ref="noticeFormRef" :model="formData" :rules="formDataRules" label-width="auto">
        <el-form-item style="width: 100%;" label="标题:" prop="title">
          <el-input
            class="form_width"
            v-model="formData.title"
            clearable
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-select class="form_width" v-model="formData.type">
            <el-option label="通知" value="1"></el-option>
            <el-option label="公告" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select class="form_width" v-model="formData.status">
            <el-option label="正常" value="1"></el-option>
            <el-option label="关闭" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 100%;" label="内容:" prop="content">
          <wang-editor
            class="form_width"
            v-model="formData.content"
          />
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
        <el-button type="primary" :loading="btnLoading" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.notice_form_dialog_comp {
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