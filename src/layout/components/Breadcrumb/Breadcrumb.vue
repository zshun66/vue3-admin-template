<script setup name="Breadcrumb">
import useUserStore from '@/pinia/modules/user.js'

const $route = useRoute()
const userStore = useUserStore()

const menus = userStore.userInfo.menus || []
let breadcrumbs = ref([])

const findBreadcrumb = (data, target, arrs = []) => {
  const dataCopy = JSON.parse(JSON.stringify(data))
  for (let item of dataCopy) {
    item.path = '/backstage/' + item.path
    const obj = { title: item.title, path: item.path }
    if (item.path === target) {
      arrs.push(obj)
      return arrs
    }
    if (item.children) {
      const result = findBreadcrumb(item.children, target, [...arrs, obj])
      if (result) return result
    }
  }
  return null
}

watch(() => $route.path, (newv, oldv) => {
  breadcrumbs.value = findBreadcrumb(menus, newv)
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