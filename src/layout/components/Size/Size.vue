<script setup name="Size">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

// size列表
const sizeList = [
  { name: 'large', title: 'large' },
  { name: 'default', title: 'default' },
  { name: 'small', title: 'small' },
]
// 当前size
const currSize = ref(appStore.configData.size)

// 切换组件大小
const toggleSize = function (size) {
  if (currSize.value !== size.name) {
    currSize.value = size.name
    appStore.setConfigData('size', currSize.value)
  }
}
</script>

<template>
  <el-dropdown
    placement="bottom"
    trigger="hover"
    :show-timeout="0"
    :hide-timeout="0"
    :popper-options="{
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, -3],
          },
        },
      ]
    }"
    :teleported="false"
    @command="toggleSize"
  >
    <div class="comp_container size_comp" title="组件大小">
      <svg-icon name="size1" size="23px"></svg-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="size_list">
        <el-dropdown-item
          class="size_item"
          :class="{ active: currSize === size.name }"
          v-for="(size, index) in sizeList"
          :key="index"
          :command="size"
        >
          <span class="size_name">{{ size.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.size_comp {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;

  :deep(.svg-icon) {
    fill: var(--theme-navbar-icon-color);
  }
}

:deep(.size_list) {
  .size_item {
    font-size: 16px;
    line-height: 32px;
    padding: 0px 20px;
    color: #777777;
  }

  .size_item:hover {
    background: #ECF5FF;
  }
  
  .size_item.active {
    color: #50A6FF;
  }
}
</style>