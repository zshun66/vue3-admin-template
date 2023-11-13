<script setup name="backstage">
import LayoutStyle1 from '@/layout/layout-style1.vue'
import LayoutStyle2 from '@/layout/layout-style2.vue'
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

const styleMap = {
  style1: LayoutStyle1,
  style2: LayoutStyle2,
}
const style = computed(() => appStore.configData.style)
</script>

<template>
  <component :is="styleMap[style]"></component>
</template>

<style scoped lang="scss"></style>