<script setup name="backstage:directive:draggable">
const active = ref('1')
</script>

<template>
  <div class="page_container draggable_page">
    <h3 class="title">拖拽指令(v-draggable) 🍇🍇🍇🍓🍓🍓</h3>
    <el-radio-group class="radio_group" v-model="active">
      <el-radio-button value="1">功能演示</el-radio-button>
      <el-radio-button value="2">指令文档</el-radio-button>
    </el-radio-group>
    <div class="function_wrap" v-draggable.sticky.screen v-if="active === '1'">
      <span>我是可以拖拽的哦~</span>
    </div>
    <div class="doc_wrap" v-if="active === '2'">
      <el-descriptions class="descriptions" title="指令值 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="value">
          <span>鼠标距离拖拽元素顶部的距离，该值决定元素是否可被拖拽，若未设置，则整个元素都是可拖拽区域，使用示例：v-draggable="50"</span>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="修饰符 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="sticky">
          <span>限制拖拽元素的边界，当仅有sticky修饰符，则默认限制边界为父元素，当没有sticky时，screen和parent修饰符都将失效，优先级高于screen和parent修饰符，使用示例：v-draggable.sticky="50"</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="screen">
          <span>限制拖拽元素的边界为浏览器可视窗口，仅当sticky修饰符存在时有效，使用示例：v-draggable.sticky.screen="50"</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="parent">
          <span>限制拖拽元素的边界为父元素，仅当sticky修饰符存在时有效，优先级大于screen，使用示例：v-draggable.sticky.parent="50"</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.draggable_page {
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
    padding: 20px;
    width: 200px;
    height: 200px;
    background: var(--app-theme-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
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