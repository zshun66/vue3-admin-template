<script setup name="Search">
import useUserStore from '@/pinia/modules/user.js'
import { extractPathsFromTree } from '@/utils/treehandler.js'

const $router = useRouter()
const userStore = useUserStore()

// 用户菜单数据
const menus = userStore.menus
// 搜索关键词
const keyword = ref('')

// 获取输入建议的方法
const querySearch = (queryString, callback) => {
  const result = extractPathsFromTree({
    data: menus,
    keyword: queryString,
    targetKey: 'title',
    extractKeys: ['path']
  })
  return result
}

// 点击选中建议项时触发
const handleSelect = (item) => {
  $router.push(item.path)
}
</script>

<template>
  <div class="comp_container search_comp" title="搜索">
    <el-autocomplete
      style="width: 200px;"
      v-model="keyword"
      :fetch-suggestions="querySearch"
      placeholder="搜索"
      :trigger-on-focus="false"
      :clearable="true"
      :highlight-first-item="true"
      :fit-input-width="false"
      @select="handleSelect"
    >
      <template #prefix>
        <svg-icon name="search1" size="25px"></svg-icon>
      </template>
    </el-autocomplete>
  </div>
</template>

<style scoped lang="scss">
.search_comp {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;

  :deep(.svg-icon) {
    fill: var(--theme-navbar-icon-color);
  }
}
</style>