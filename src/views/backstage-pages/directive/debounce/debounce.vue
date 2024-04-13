<script setup name="backstage:directive:debounce">
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
  <div class="page_container debounce_page">
    <h3 class="title">防抖指令(v-debounce) 🍇🍇🍇🍓🍓🍓</h3>
    <el-radio-group class="radio_group" v-model="active">
      <el-radio-button value="1">功能演示</el-radio-button>
      <el-radio-button value="2">指令文档</el-radio-button>
    </el-radio-group>
    <div class="function_wrap" v-if="active === '1'">
      <el-input style="width: 400px;" v-model="inputValue" clearable placeholder="我是防抖输入框，1秒后才会执行回调哦~"
      v-debounce:1000.input="(e) => handleInput(e, '周大帅')"></el-input>
      <el-button style="display: block; margin-top: 50px;" type="primary"
      v-debounce:1000.click.immediate="(e) => handleClick(e, '周大帅')">我是防抖按钮，会立即执行回调且1秒内重复触发不会再次执行哦~</el-button>
    </div>
    <div class="doc_wrap" v-if="active === '2'">
      <el-descriptions class="descriptions" title="指令值 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="callback">
          <span>防抖回调函数，使用示例：v-debounce="callback"</span>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="指令参数 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="delay(延迟时间)">
          <span>防抖延迟时间(即多久时间内不可重复触发)，使用示例：v-debounce:1000="callback"</span>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" title="修饰符 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="immediate">
          <span>是否立即执行回调，使用示例：v-debounce:1000.immediate="callback"</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="eventName">
          <span>作用防抖的原生事件名称(必填)(例如：input、change、click...)，使用示例：v-debounce:1000.immediate.input="callback"</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.debounce_page {
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