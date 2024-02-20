<script setup name="Breadcrumb">
import useUserStore from '@/pinia/modules/user.js'
import { extractBreadcrumbsFromTree } from '@/utils/utils.js'

const $route = useRoute()
const userStore = useUserStore()

let breadcrumbs = ref([])

watch(() => $route.path, (newv, oldv) => {
  const menus = userStore.userInfo.menus || []
  breadcrumbs.value = extractBreadcrumbsFromTree(menus, newv, ['title', 'path'])
}, { immediate: true })
</script>

<template>
  <div class="comp_container breadcrumb_comp">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :key="index"
        :to="{ path: item.path }"
      >{{ item.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb_comp {
  padding-left: 10px;
}
</style>