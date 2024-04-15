<script setup name="backstage:directive:throttle">
const active = ref('1')
const inputValue = ref('')

const handleInput = (e, name) => {
  ElMessage.success(`输入框的值：${inputValue.value} --- 额外参数姓名：${name}`)
}

const handleClick = (e, name) => {
  ElMessage.success(`按钮被点击了！ --- 额外参数姓名：${name}`)
}
</script>

<template>
  <div class="page_container throttle_page">
    <h3 class="title">节流指令(v-throttle) 🍇🍇🍇🍓🍓🍓</h3>
    <el-radio-group class="radio_group" v-model="active">
      <el-radio-button value="1">功能演示</el-radio-button>
      <el-radio-button value="2">指令文档</el-radio-button>
    </el-radio-group>
    <div class="function_wrap" v-if="active === '1'">
      <el-input style="width: 400px;" v-model="inputValue" clearable placeholder="我是节流输入框，每隔1秒后就会执行回调哦~"
      v-throttle:1000.input="(e) => handleInput(e, '周大帅')"></el-input>
      <el-button style="display: block; margin-top: 50px;" type="primary"
      v-throttle:1000.click="(e) => handleClick(e, '周大帅')">我是节流按钮，每隔1秒后就会执行回调哦~</el-button>
    </div>
    <div class="doc_wrap" v-if="active === '2'">
      <el-descriptions class="descriptions" title="指令值 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="callback">
          <span>节流回调函数，使用示例：v-throttle="callback"</span>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="指令参数 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="delay(延迟时间，单位：ms)">
          <span>节流延迟时间(即多久时间内不可重复触发，默认1000毫秒)，使用示例：v-throttle:1000="callback"</span>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="修饰符 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="eventName">
          <span>作用节流的原生事件名称(必填)(例如：input、change、click...)，使用示例：v-throttle:1000.input="callback"</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.throttle_page {
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
    margin-top: 100px;
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