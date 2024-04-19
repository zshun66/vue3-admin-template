<script setup name="ImportExcel">
import useDownload from '@/hooks/useDownload.js'

const $props = defineProps({
  // 是否显示弹框
  modelValue: {
    type: Boolean,
    default: false
  },
  // 弹框标题
  title: {
    type: String,
    default: '导入数据'
  },
  // 模版下载的接口地址
  tempApi: {
    type: String,
    default: ''
  },
  // 上传文件的接口地址
  uploadApi: {
    type: String,
    default: ''
  },
  // 最大文件大小(单位MB)
  maxFileSize: {
    type: Number,
    default: 10
  }
})
const $emits = defineEmits([
  'update:modelValue',
  'import-success'
])

const show = ref($props.modelValue)
// 上传请求头
const headers = {}
// 数据覆盖
const isCover = ref(false)



// 下载模板
const handleDownloadTemp = () => {
  useDownload()
}

// 文件状态改变时钩子
const handleUploadChange = (file, fileList) => {

}

// 移除文件时钩子
const handleUploadRemove = (file, fileList) => {

}

// 超出限制时钩子
const handleUploadExceed = (files, uploadFiles) => {
  ElMessage.error('最多只能上传一个文件')
}

// 文件上传前钩子
const handleBeforeUpload = (file) => {
  const fileSize = file.size / 1024 / 1024
  if (fileSize > $props.maxFileSize) {
    ElMessage.error('文件大小最大为10MB，请重新上传')
    return false
  }
}

// 文件上传中钩子
const handleUploadProgress = (event, file, fileList) => {

}

// 文件上传成功钩子
const handleUploadSuccess = (response, file, fileList) => {
  ElMessage.success(`文件上传成功`)
  $emits('update:modelValue', false)
  $emits('import-success', response)
}

// 文件上传失败钩子
const handleUploadError = (error, file, fileList) => {
  ElMessage.error(`文件上传失败: ${error.message}`)
}

// 关闭弹框
const handleDialogClosed = () => {
  $emits('update:modelValue', false)
}

watch(() => $props.modelValue, (newv, oldv) => {
  show.value = $props.modelValue
})
</script>

<template>
  <el-dialog
    class="comp_container import_excel_comp"
    v-model="show"
    :title="title"
    width="550px"
    :append-to-body="false"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    :draggable="true"
    :overflow="false"
    :destroy-on-close="true"
    @closed="handleDialogClosed"
  >
    <el-form class="import_excel_form">
      <el-form-item label="模板下载 :" label-width="80px">
        <el-button type="primary" icon="Download" @click="handleDownloadTemp">点击下载</el-button>
      </el-form-item>
      <el-form-item label="文件上传 :" label-width="80px">
        <el-upload
          class="import_excel_upload"
          :action="uploadApi" :headers="headers"
          method="post" name="file"
          :data="{ isCover: isCover }"
          accept=".xls, .xlsx"
          :limit="1" :drag="true"
          :show-file-list="true"
          :on-change="handleUploadChange"
          :on-remove="handleUploadRemove"
          :on-exceed="handleUploadExceed"
          :before-upload="handleBeforeUpload"
          :on-progress="handleUploadProgress"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
        >
          <el-icon size="70px" color="#A8ABB2"><upload-filled /></el-icon>
          <div class="upload_text">将文件拖到此处，或<span>点击上传</span></div>
          <template #tip>
            <div class="upload_tip">请上传 .xls , .xlsx 标准格式文件，文件最大为 {{ maxFileSize }}MB</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="数据覆盖 :" label-width="80px">
        <el-switch v-model="isCover"></el-switch>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss">
.import_excel_comp {

  .import_excel_form {

    .import_excel_upload {

      .upload_text {
        width: 350px;

        span {
          color: var(--app-theme-color);
        }
      }

      .upload_tip {

      }
    }
  }
}
</style>