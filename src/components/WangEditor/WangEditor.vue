<script setup name="WangEditor">
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar } from '@wangeditor/editor'

const $props = defineProps({
  // 编辑器内容HTML
  modelValue: {
    type: String,
    default: ''
  },
  // 编辑器高度
  height: {
    type: String,
    default: '500px'
  },
  // 编辑器模式 或 'simple'
  mode: {
    type: String,
    default: 'default'
  },
  // 编辑器配置
  editorConfig: {
    type: Object,
    default: () => ({})
  },
  // 工具栏配置
  toolbarConfig: {
    type: Object,
    default: () => ({})
  },
})
const $emits = defineEmits([
  'update:modelValue',
])


// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 工具栏实例
const toolbarRef = shallowRef()

onMounted(() => {
  // 创建编辑器实例
  editorRef.value = createEditor({
    selector: '.wang_editor_editor_container',
    html: $props.modelValue,
    config: $props.editorConfig,
    mode: $props.mode,
  })
  // 创建工具栏实例
  toolbarRef.value = createToolbar({
    editor: editorRef.value,
    selector: '.wang_editor_toolbar_container',
    config: $props.toolbarConfig,
    mode: $props.mode,
  })

  console.log(editorRef.value)
  console.log(editorRef.value.getConfig())
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<template>
  <div class="comp_container wang_editor_comp">
    <div class="wang_editor_toolbar_container"></div>
    <div class="wang_editor_editor_container" :style="{ height: height }"></div>
  </div>
</template>

<style scoped lang="scss">
.wang_editor_comp {
  width: 100%;
  height: auto;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;

  .wang_editor_toolbar_container {
    border-bottom: 1px solid #dcdfe6;
  }

  .wang_editor_editor_container {
    overflow-y: hidden;
  }
}
</style>