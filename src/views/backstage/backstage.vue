<script setup name="backstage">
import Layout from '@/layout/layout.vue'

console.log(useRouter().getRoutes())
</script>

<template>
  <component :is="Layout"></component>
</template>

<style scoped lang="scss"></style>