<script setup name="Theme">
import useAppStore from '@/pinia/modules/app.js'

const appStore = useAppStore()

// 主题列表
const themeList = [
  {
    name: 'light',
    title: '亮色主题',
    icon: new URL('@/assets/images/light_theme.svg', import.meta.url).href
  },
  {
    name: 'dark',
    title: '暗色主题',
    icon: new URL('@/assets/images/dark_theme.svg', import.meta.url).href
  },
]
// 当前主题
const currTheme = ref(appStore.theme)

// 设置主题
const setTheme = function (themeName) {
  const htmlDom = document.querySelector('html')
  htmlDom.classList.remove('light')
  htmlDom.classList.remove('dark')
  htmlDom.classList.add(themeName)
}

// 切换主题
const toggleTheme = function (theme) {
  if (currTheme.value !== theme.name) {
    currTheme.value = theme.name
    setTheme(currTheme.value)
    appStore.setConfigData('theme', currTheme.value)
  }
}

// 进入页面就设置默认主题
setTheme(currTheme.value)
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
    @command="toggleTheme"
  >
    <div class="comp_container theme_comp" title="主题切换">
      <svg-icon name="theme1" size="20px"></svg-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="theme_list">
        <el-dropdown-item
          class="theme_item"
          :class="{ active: currTheme === theme.name }"
          v-for="(theme, index) in themeList"
          :key="index"
          :command="theme"
        >
          <img class="theme_icon" :src="theme.icon">
          <span class="theme_name">{{ theme.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.theme_comp {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;

  :deep(.svg-icon) {
    fill: var(--theme-navbar-icon-color);
  }
}

:deep(.theme_list) {
  .theme_item {
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 50px;
    padding: 0px 20px;
    color: #777777;

    .theme_icon {
      width: 35px;
    }

    .theme_name {
      margin-top: -2px;
      margin-left: 10px;
    }
  }

  .theme_item:hover {
    background: #ECF5FF;
  }

  .theme_item.active {
    color: #50A6FF;
  }
}
</style>