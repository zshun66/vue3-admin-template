<script setup name="backstage:directive:role">
const active = ref('1')
</script>

<template>
  <div class="page_container role_page">
    <h3 class="title">角色指令(v-role) 🍇🍇🍇🍓🍓🍓</h3>
    <el-radio-group class="radio_group" v-model="active">
      <el-radio-button value="1">功能演示</el-radio-button>
      <el-radio-button value="2">指令文档</el-radio-button>
    </el-radio-group>
    <div class="function_wrap" v-if="active === '1'" v-role>
      <el-button type="primary" v-role="'administrator'">我是只有administrator角色才能看到的按钮</el-button>
      <el-button type="primary" v-role="'salesman'">我是只有salesman角色才能看到的按钮</el-button>
    </div>
    <div class="doc_wrap" v-if="active === '2'">
      <el-descriptions class="descriptions" title="指令值 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="value">
          <span>权限字符，可以是字符串，也可以是数组，使用示例：v-role="'administrator'" v-role="['administrator', 'salesman']"</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.role_page {
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
    width: 1000px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
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