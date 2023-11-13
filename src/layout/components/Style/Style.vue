<script setup name="Style">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

// 风格列表
const styleList = [
  { name: 'style1', title: '风格一' },
  { name: 'style2', title: '风格二' },
]
// 当前风格
const currStyle = ref(appStore.configData.style)

// 切换风格
const toggleStyle = function (style) {
  if (currStyle.value !== style.name) {
    currStyle.value = style.name
    appStore.setConfigData('style', currStyle.value)
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
    @command="toggleStyle"
  >
    <div class="comp_container style_comp" title="布局风格">
      <icon-page theme="outline" size="22" :strokeWidth="3" />
    </div>
    <template #dropdown>
      <el-dropdown-menu class="style_list">
        <el-dropdown-item
          class="style_item"
          :class="{ active: currStyle === style.name }"
          v-for="(style, index) in styleList"
          :key="index"
          :command="style"
        >
          <span class="style_name">{{ style.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.style_comp {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;

  :deep(.i-icon svg path),
  :deep(.i-icon svg rect) {
    stroke: var(--theme-navbar-icon-color);
  }
}

:deep(.style_list) {
  .style_item {
    font-size: 16px;
    line-height: 32px;
    padding: 0px 20px;
    color: #777777;
  }

  .style_item:hover {
    background: #ECF5FF;
  }
  
  .style_item.active {
    color: #50A6FF;
  }
}
</style>