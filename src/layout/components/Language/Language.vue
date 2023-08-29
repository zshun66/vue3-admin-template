<script setup name="Language">
// 语言列表
const langList = [
  { name: 'zh-CN', title: '简体中文' },
  { name: 'zh-TW', title: '繁体中文' },
  { name: 'en-US', title: 'English' },
]
// 当前语言
const currLang = ref('zh-CN')

// 切换语言
const toggleLanguage = function (lang) {
  if (currLang.value !== lang.name) {
    currLang.value = lang.name
  }
}
</script>

<template>
  <el-popover
    :popper-style="{
      padding: '8px 0'
    }"
    width="150px"
    trigger="hover"
    placement="bottom"
    :hide-after="200"
    :teleported="false"
    transition="none"
    :offset="0"
  >
    <template #reference>
      <div class="comp_container language_comp" title="语言切换">
        <icon-translate theme="outline" size="26" fill="#fff" :strokeWidth="3" />
      </div>
    </template>
    <div class="language_list">
      <span
        class="language_item"
        :class="{ active: currLang === lang.name }"
        v-for="(lang, index) in langList"
        :key="index"
        @click="toggleLanguage(lang)"
      >{{ lang.title }}</span>
    </div>
  </el-popover>
</template>

<style scoped lang="scss">
.language_comp {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;
}

.language_list {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .language_item {
    font-size: 16px;
    line-height: 32px;
    padding: 0px 20px;
    color: #606266;
  }

  .language_item:hover {
    color: #50A6FF;
    background: #ECF5FF;
  }

  .language_item.active {
    color: #50A6FF;
    background: #ECF5FF;
  }
}
</style>