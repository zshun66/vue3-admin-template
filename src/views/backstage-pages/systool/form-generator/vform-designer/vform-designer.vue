<script setup name="backstage:systool:form-generator:vform-designer">
const vFormDesignerRef = ref(null)
onMounted(() => {
  console.log(vFormDesignerRef.value)
})
</script>

<template>
  <div class="page_container vform_designer_page">
    <v-form-designer ref="vFormDesignerRef"></v-form-designer>
  </div>
</template>

<style scoped lang="scss">
.vform_designer_page {
  width: 100%;
}
</style>