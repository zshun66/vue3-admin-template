<script setup name="backstage:about">
import packageJson from '/package.json'
</script>

<template>
  <div class="page_container about_page">
    <div class="card">
      <div class="title">项目介绍</div>
      <div class="content">
        <span class="name">Qs-Admin</span>
        <span class="text">一款基于 Vue3.4、Vite5、Pinia、Element-Plus 开源的后台管理框架，使用目前最新技术栈开发。另外本项目还封装了一些常用组件、Hooks、指令、动态路由、按钮级别权限控制等功能。</span>
      </div>
    </div>
    <div class="card">
      <div class="title">项目信息</div>
      <el-descriptions class="descriptions" :column="4" border>
        <el-descriptions-item label-class-name="descriptions-item" label="作者">
          <el-tag>{{ packageJson.author.name }}</el-tag>  
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="版本号">
          <el-tag>{{ packageJson.version }}</el-tag>  
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="发布时间">
          <el-tag>{{ '2024-05-01 11:12:33' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="Node版本">
          <el-tag>{{ packageJson.engines.node }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="文档地址" :span="2">
          <span style="color: #009688; cursor: pointer;">{{ packageJson.docsUrl }}</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="预览地址" :span="2">
          <span style="color: #009688; cursor: pointer;">{{ packageJson.previewUrl }}</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="Gitee" :span="2">
          <span style="color: #009688; cursor: pointer;">{{ packageJson.repository.gitee }}</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="Github" :span="2">
          <span style="color: #009688; cursor: pointer;">{{ packageJson.repository.github }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="card">
      <div class="title">生产环境依赖</div>
      <el-descriptions class="descriptions" :column="3" border>
        <el-descriptions-item label-class-name="descriptions-item" :label="key"
        v-for="(value, key) in packageJson.dependencies" :key="key">
          <el-tag type="info">{{ value }}</el-tag>  
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="card">
      <div class="title">开发环境依赖</div>
      <el-descriptions class="descriptions" :column="3" border>
        <el-descriptions-item label-class-name="descriptions-item" :label="key"
        v-for="(value, key) in packageJson.devDependencies" :key="key">
          <el-tag type="info">{{ value }}</el-tag>  
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about_page {
  .card {
    background: #ffffff;
    box-shadow: 0 0 10px -6px #999;
    border-radius: 7px;
    padding: 15px 15px 12px;
    .title {
      font-size: 17px;
      font-weight: 700;
      color: #303133;
    }
    .content {
      margin-top: 10px;
      line-height: 28px;
      .name {
        color: #009688;
        cursor: pointer;
      }
      .name:hover {
        text-decoration: underline;
      }
      .text {
        margin-left: 10px;
        color: #606266;
      }
    }
    .descriptions {
      margin-top: 15px;
      :deep(.descriptions-item) {
        font-weight: 700;
        font-size: 15px;
      }
    }
  }

  .card + .card {
    margin-top: 10px;
  }
}
</style>