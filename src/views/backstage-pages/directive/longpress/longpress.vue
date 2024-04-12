<script setup name="backstage:directive:longpress">
const active = ref('1')

const longpressCallback = (e) => {
  ElMessage.success('长按事件触发')
}
</script>

<template>
  <div class="page_container longpress_page">
    <h3 class="title">长按指令(v-longpress) 🍇🍇🍇🍓🍓🍓</h3>
    <el-radio-group class="radio_group" v-model="active">
      <el-radio-button value="1">功能演示</el-radio-button>
      <el-radio-button value="2">指令文档</el-radio-button>
    </el-radio-group>
    <div class="function_wrap" v-if="active === '1'">
      <el-button type="primary" v-longpress:1000="longpressCallback">我是可以长按的按钮哦~</el-button>
    </div>
    <div class="doc_wrap" v-if="active === '2'">
      <el-descriptions class="descriptions" title="指令值 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="value">
          <span>长按事件回调函数，使用示例：v-longpress="callback"</span>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="指令参数 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="delay(延迟时间)">
          <span>触发长按事件的延迟时间(即长按多久触发回调)，使用示例：v-longpress:1000="callback"</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.longpress_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-top: 20px;
    font-size: 22px;
  }

  .radio_group {
    margin-top: 50px;
  }

  .function_wrap {
    margin-top: 200px;
  }

  .doc_wrap {
    width: 1000px;

    :deep(.descriptions) {
      margin-top: 50px;
    }

    :deep(.descriptions-item) {
      width: 200px;
    }
  }
}
</style>