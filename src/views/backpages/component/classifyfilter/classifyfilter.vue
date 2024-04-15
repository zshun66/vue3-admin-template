<script setup name="backstage:component:classifyfilter">
const stateOptions = [
  { label: '已下单', value: 1 },
  { label: '已发货', value: 2 },
  { label: '已签收', value: 3 },
  { label: '已退回', value: 4 },
  { label: '已完成', value: 5 },
]
const typeOptions = [
  { label: '食品类', value: 1 },
  { label: '服装类', value: 2 },
  { label: '家具类', value: 3 },
  { label: '母婴类', value: 4 },
  { label: '数码类', value: 5 },
]

const state = ref('')
const type = ref([])
</script>

<template>
  <div class="page_container classifyfilter_page">
    <div class="title_wrap">分类筛选器 🍓🍇🍈🍉</div>
    <div class="classify_filter_wrap">
      <ClassifyFilter v-model="state" title="物流状态(单选)" :options="stateOptions"></ClassifyFilter>
      <el-divider border-style="dashed" />
      <ClassifyFilter v-model="type" title="商品类型(多选)" :options="typeOptions" multiple></ClassifyFilter>
    </div>
    <div class="return_value_wrap">
      <span>返回值：物流状态 {{ state }}、商品类型 {{ type }}</span>
    </div>
    <div class="doc_wrap">
      <el-descriptions class="descriptions" title="配置项 📚" :column="1" border>
        <el-descriptions-item label-class-name="descriptions-item" label="v-model">
          <span>双向绑定的值</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="title">
          <span>分类筛选器标题</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="options">
          <div>需要筛选的数据列表</div>
          <div>option: <pre style="display: inline; font-family: inherit;">{{ { label: '已完成', value: 5, iconType: 'svg', iconName: 'finished', iconSize: '14px' } }}</pre></div>
          <div>label: 选项标签</div>
          <div>value: 选项值</div>
          <div>iconType: 图标类型(可选值：svg(svg图标)、ele(UI库图标))</div>
          <div>iconName: 图标名称</div>
          <div>iconSize: 图标大小</div>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="allLabel">
          <span>“全部”这个选项的标签</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="descriptions-item" label="allValue">
          <span>“全部”这个选项的值</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<style scoped lang="scss">
.classifyfilter_page {
  width: 100%;

  .title_wrap {
    margin-top: 15px;
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    color: var(--el-text-color-regular);
  }

  .classify_filter_wrap {
    margin-top: 30px;
  }

  .return_value_wrap {
    margin-top: 30px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: var(--el-text-color-regular);
  }

  .doc_wrap {
    margin-top: 30px;
  }
}
</style>