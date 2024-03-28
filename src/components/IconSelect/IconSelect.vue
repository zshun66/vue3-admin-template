<script setup name="IconSelect">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import svgicons from 'virtual:svg-icons-names'
const allEleIconKeys = Object.keys(ElementPlusIconsVue)
const allSvgIconKeys = svgicons.map(item => item.slice(5))

const $props = defineProps({
  // 是否显示弹框
  show: {
    type: Boolean,
    default: false
  },
  // 图标类型(ele、svg)
  type: {
    type: String,
    default: 'svg'
  },
  // 选择的图标名称
  icon: {
    type: String,
    default: false
  },
  title: {
    type: String,
    default: '请选择图标'
  }
})
const $emits = defineEmits([
  'update:show',
  'update:icon',
])

const dialogVisible = ref($props.show)
const inputValue = ref('')

const iconList = computed(() => {
  if ($props.type === 'ele') {
    return allEleIconKeys.filter(key => key.toLowerCase().indexOf(inputValue.value) > -1)
  } else if ($props.type === 'svg') {
    return allSvgIconKeys.filter(key => key.toLowerCase().indexOf(inputValue.value) > -1)
  }
})

const handleSelectIcon = (icon) => {
  $emits('update:show', false)
  $emits('update:icon', icon)
}

const handleDialogClosed = () => {
  $emits('update:show', false)
}

watch(() => $props.show, (newv, oldv) => {
  dialogVisible.value = $props.show
})
</script>

<template>
  <div class="comp_container icon_select_comp">
    <el-dialog v-model="dialogVisible" :title="title" top="8vh" width="1000px" @closed="handleDialogClosed">
      <el-input v-model="inputValue" placeholder="搜索图标" clearable prefix-icon="Search" />
      <div class="icon_list_wrapper custom_scrollbar" v-if="iconList.length > 0">
        <div class="icon_item" v-for="(item, index) in iconList" :key="index" @click="handleSelectIcon(item)">
          <el-icon size="30px" color="#606266" v-if="type === 'ele'"><component :is="item"></component></el-icon>
          <svg-icon :name="item" size="30px" color="#606266" v-if="type === 'svg'"></svg-icon>
          <span class="icon_name">{{ item }}</span>
        </div>
      </div>
      <el-empty v-else description="未搜索到您要找的图标~" />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.icon_select_comp {

  .icon_list_wrapper {
    max-height: 70vh;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;

    .icon_item {
      width: calc(100% / 7);
      padding: 20px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      will-change: transform;
      transition: transform 0.2s;

      .icon_name {
        margin-top: 15px;
        white-space: nowrap;
      }
    }

    .icon_item:hover {
      transform: scale(1.2);
    }
  }
}
</style>