<script setup name="Language">
import useAppStore from '@/pinia/modules/app.js'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const appStore = useAppStore()

// 语言列表
const langList = [
  { name: 'zh-CN', title: '简体中文' },
  { name: 'zh-TW', title: '繁体中文' },
  { name: 'en-US', title: 'English' },
]
// 当前语言
const currLang = ref(appStore.lang)

// 设置语言
const setLanguage = function (langName) {
  i18n.locale.value = langName
}

// 切换语言
const toggleLanguage = function (lang) {
  if (currLang.value !== lang.name) {
    currLang.value = lang.name
    setLanguage(currLang.value)
    appStore.setConfigData('lang', currLang.value)
  }
}

// 进入页面就设置默认语言
setLanguage(currLang.value)
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
    @command="toggleLanguage"
  >
    <div class="comp_container language_comp" title="语言切换">
      <svg-icon name="translate1" size="20px"></svg-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="language_list">
        <el-dropdown-item
          class="language_item"
          :class="{ active: currLang === lang.name }"
          v-for="(lang, index) in langList"
          :key="index"
          :command="lang"
        >
          <span class="language_name">{{ lang.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.language_comp {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;

  :deep(.svg-icon){
    fill: var(--theme-navbar-icon-color);
  }
}

:deep(.language_list) {
  .language_item {
    font-size: 16px;
    line-height: 32px;
    padding: 0px 20px;
    color: #777777;
  }

  .language_item:hover {
    background: var(--el-color-primary-light-9);
  }
  
  .language_item.active {
    color: var(--app-theme-color);
  }
}
</style>