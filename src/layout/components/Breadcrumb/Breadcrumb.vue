<script setup name="Breadcrumb">
import useUserStore from '@/pinia/modules/user.js'
import { extractBreadcrumbsFromTree } from '@/utils/treehandler.js'

const $route = useRoute()
const userStore = useUserStore()

let breadcrumbs = ref([])

watch(() => $route.path, (newv, oldv) => {
  const menus = userStore.menus || []
  breadcrumbs.value = extractBreadcrumbsFromTree({
    data: menus,
    target: newv,
    extractKeys: ['title', 'path', 'icon', 'iconSize']
  })
}, { immediate: true })
</script>

<template>
  <div class="comp_container breadcrumb_comp">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs" :key="index"
        :to="{ path: item.path }"
      >
        <svg-icon class="icon" :name="item.icon" :size="item.iconSize"></svg-icon>
        <span class="text">{{ item.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb_comp {
  padding-left: 10px;

  :deep(.el-breadcrumb) {
    display: flex;
    align-items: center;
  }

  :deep(.el-breadcrumb__inner) {
    display: flex;
    align-items: center;
  }
  
  :deep(.el-breadcrumb__inner .icon) {
    margin-right: 5px;
    transform: scale(0.85);
    fill: var(--el-text-color-regular);
    transition: fill 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  :deep(.el-breadcrumb__inner.is-link .icon) {
    fill: var(--el-text-color-primary);
  }

  :deep(.el-breadcrumb__inner.is-link:hover .icon) {
    fill: var(--el-color-primary);
  }

  :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner .icon) {
    fill: var(--el-text-color-regular);
  }

  :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover .icon) {
    fill: var(--el-text-color-regular);
  }
}
</style>