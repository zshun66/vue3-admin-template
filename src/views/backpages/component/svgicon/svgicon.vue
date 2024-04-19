<script setup name="backstage:component:svgicon">
</script>

<template>
  <div class="page_container svgicon_page">
    <div class="title_wrap">图标选择器 🍓🍇🍈🍉</div>
    <div class="svg_icon_wrap">
      <svg-icon name="svg1" color="#4DB6AC" size="100px"></svg-icon>
      <svg-icon name="search1" color="#4DB6AC" size="130px"></svg-icon>
      <svg-icon name="menu3" color="#4DB6AC" size="130px"></svg-icon>
      <svg-icon name="notice1" color="#4DB6AC" size="110px"></svg-icon>
    </div>
    <div class="doc_wrap">
      <el-descriptions class="descriptions" title="配置项 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="name">
          <span>图标名称</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="color">
          <span>图标颜色</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="size">
          <span>图标大小，单位px</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="width">
          <span>图标宽度，权重比size高</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="height">
          <span>图标高度，权重比size高</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.svgicon_page {
  width: 100%;

  .title_wrap {
    margin-top: 15px;
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    color: var(--el-text-color-regular);
  }

  .svg_icon_wrap {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .doc_wrap {
    margin-top: 30px;
  }
}
</style>