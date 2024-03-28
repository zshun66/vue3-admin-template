<script setup name="backstage:directive:copy">
const active = ref('1')
const copyValue = ref('我是被复制的内容 🍒 🍉 🍊')
</script>

<template>
  <div class="page_container copy_page">
    <h3 class="title">复制指令 🍇🍇🍇🍓🍓🍓</h3>
    <el-radio-group class="radio_group" v-model="active">
      <el-radio-button value="1">功能演示</el-radio-button>
      <el-radio-button value="2">指令文档</el-radio-button>
    </el-radio-group>
    <div class="function_wrap" v-if="active === '1'">

    </div>
    <div class="doc_wrap" v-if="active === '2'">
      <el-descriptions class="descriptions" title="配置项 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="v-copy">
          <span>需要复制的文本，可绑定响应式数据，使用示例：v-copy="'复制的内容'" v-copy="copyValue"</span>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="事件 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="copy-success">
          <span>复制成功时调用，使用示例：@copy-success="handleCopySuccess"</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="copy-fail">
          <span>复制失败时调用，使用示例：@copy-fail="handleCopyFail"</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.copy_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-top: 20px;
    font-size: 22px;
  }

  .radio_group {
    margin-top: 25px;
  }

  .function_wrap {

  }

  .doc_wrap {
    width: 1000px;

    :deep(.descriptions) {
      margin-top: 30px;
    }

    :deep(.descriptions-item) {
      width: 200px;
    }
  }
}
</style>