<script setup name="backstage:directive:watermark">
const active = ref('1')
const option = {
  text: '水印',
  family: 'Microsoft JhengHei',
  size: 20,
  color: 'rgba(180, 180, 180, 0.5)',
  angle: -30,
  row: 5,
  column: 8,
}
</script>

<template>
  <div class="page_container watermark_page">
    <h3 class="title">水印指令 🍇🍇🍇🍓🍓🍓</h3>
    <el-radio-group class="radio_group" v-model="active">
      <el-radio-button value="1">功能演示</el-radio-button>
      <el-radio-button value="2">指令文档</el-radio-button>
    </el-radio-group>
    <div class="function_wrap" v-watermark="option" v-if="active === '1'">
      
    </div>
    <div class="doc_wrap" v-if="active === '2'">
      <el-descriptions class="descriptions" title="配置项 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="option">
          <div>指令配置选项，对象类型，使用示例：v-watermark="option"</div>
          <div>option: <pre style="display: inline; font-family: inherit;">{{ option }}</pre></div>
          <div>text: 水印文字</div>
          <div>family: 水印字体</div>
          <div>size: 水印字体大小</div>
          <div>color: 水印字体颜色</div>
          <div>angle: 水印文字角度</div>
          <div>row: 水印行数</div>
          <div>column: 水印列数</div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.watermark_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .title {
    margin-top: 20px;
    font-size: 22px;
  }

  .radio_group {
    margin-top: 50px;
    position: relative;
    z-index: 9;
  }

  .function_wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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