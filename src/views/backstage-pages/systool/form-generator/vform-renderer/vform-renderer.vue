<script setup name="backstage:systool:form-generator:vform-renderer">
import formJsonData from './formJson.json'
const formJson = reactive(formJsonData)
const formData = reactive({
  // date: ['2021-05-09', '2024-02-25']
})
const optionData = reactive({})
const vFormRef = ref(null)

onMounted(() => {
  console.log(vFormRef.value)
})

const submitForm = () => {
  vFormRef.value.getFormData().then(formData => {
    console.log(formData)
    alert(JSON.stringify(formData))
  }).catch(error => {
    ElMessage.error(error)
  })
}
</script>

<template>
  <div class="page_container vform_renderer_page">
    <v-form-render
      ref="vFormRef"
      :form-json="formJson"
      :form-data="formData"
      :option-data="optionData"
    ></v-form-render>
    <el-button type="primary" @click="submitForm">提交</el-button>
  </div>
</template>

<style scoped lang="scss">
.vform_renderer_page {
  width: 100%;
}
</style>