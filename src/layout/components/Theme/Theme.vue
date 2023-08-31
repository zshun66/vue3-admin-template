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
const currTheme = ref(appStore.configData.theme)

// 图标颜色
const iconColor = computed(() => {
  if (appStore.configData.theme === 'light') {
    return '#000000'
  } else if (appStore.configData.theme === 'dark') {
    return '#ffffff'
  }
})

// 设置主题
const setTheme = function (themeName) {
  const themeLinkDom = document.querySelector('#theme-link')
  if (themeLinkDom) document.head.removeChild(themeLinkDom)
  const link = document.createElement('link')
  link.id = 'theme-link'
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = `/src/theme/${themeName}.css`
  document.head.appendChild(link)
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
      <icon-theme theme="outline" size="24" :fill="iconColor" :strokeWidth="3"/>
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
  padding: 10px 10px;
  cursor: pointer;
}

:deep(.theme_list) {
  .theme_item {
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 50px;
    padding: 0px 20px;
    color: #606266;

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