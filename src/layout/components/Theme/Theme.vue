<script setup name="Theme">
// 主题列表
const themeList = [
  { name: 'light', },
  { name: 'dark', },
]
// 当前主题
const currTheme = ref('light')

// 切换主题
const toggleTheme = function (theme) {
  if (currTheme.value !== theme.name) {
    currTheme.value = theme.name
  }
}
</script>

<template>
  <div class="comp_container theme_comp" title="主题切换">
    <icon-platte theme="outline" size="24" fill="#fff" :strokeWidth="3" />
  </div>
</template>

<style scoped lang="scss">
.theme_comp {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;
}
</style>