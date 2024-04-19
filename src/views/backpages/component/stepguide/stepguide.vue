<script setup name="backstage:component:stepguide">
const showStepGuideDialog = ref(false)
const config = {
  steps: [
    { element: 'aside.layout_aside', popover: { title: '左侧区域', description: '该区域为系统的菜单栏' } },
    { element: 'header.layout_header', popover: { title: '顶部区域', description: '系统的导航栏和标签栏' } },
    { element: 'div.toggle_comp', popover: { title: '折叠图标', description: '可将左侧的菜单栏折叠或展开' } },
    { element: 'div.breadcrumb_comp', popover: { title: '面包屑', description: '指示当前页面位置' } },
    { element: 'div.search_comp', popover: { title: '菜单搜索', description: '可快速搜索系统中的菜单并跳转' } },
    { element: 'div.fullscreen_comp', popover: { title: '应用全屏', description: '可将应用快速切换为全屏和退出全屏' } },
    { element: 'div.theme_comp', popover: { title: '主题切换', description: '切换系统的主题，可选值有 亮色主题(light)、暗色主题(dark)' } },
    { element: 'div.language_comp', popover: { title: '语言切换', description: '切换系统的语言' } },
    { element: 'div.size_comp', popover: { title: '组件大小', description: '切换系统的UI组件默认大小' } },
    { element: 'div.setting_comp', popover: { title: '系统设置', description: '系统设置' } },
    { element: 'div.userinfo_comp', popover: { title: '系统设置', description: '个人信息展示、个人中心、退出登录' } },
    { element: 'div.tagsview_container', popover: { title: '标签页', description: '标签页区域，标签页中的页面会有缓存，关闭标签页该页面失去缓存' } },
    { element: 'main.layout_main', popover: { title: '内容区域', description: '显示左侧菜单对应的页面内容' } },
  ],
  showProgress: true,
  progressText: '{{current}} / {{total}}',
  nextBtnText: '下一步',
  prevBtnText: '上一步',
  doneBtnText: '完成',
}
</script>

<template>
  <div class="page_container stepguide_page">
    <div class="title_wrap">引导页 🍓🍇🍈🍉</div>
    <div class="step_guide_wrap">
      <el-button type="primary" @click="showStepGuideDialog = true;">打开引导页</el-button>
      <StepGuide v-model="showStepGuideDialog" :config="config"></StepGuide>
    </div>
    <div class="doc_wrap">
      <el-descriptions class="descriptions" title="配置项 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="v-model">
          <span>双向绑定引导页显示</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="config">
          <span>引导页配置，本组件使用第三方插件 driver.js 实现，config配置详见官方文档：https://driverjs.com/docs/configuration</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stepguide_page {
  width: 100%;

  .title_wrap {
    margin-top: 15px;
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    color: var(--el-text-color-regular);
  }

  .step_guide_wrap {
    margin-top: 30px;
    text-align: center;
  }

  .doc_wrap {
    margin-top: 30px;
  }
}
</style>