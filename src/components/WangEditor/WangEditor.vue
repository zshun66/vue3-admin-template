<script setup name="WangEditor">
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const $props = defineProps({
  // 编辑器内容HTML
  modelValue: {
    type: String,
    default: ''
  },
  // 编辑器模式 或 'simple'
  mode: {
    type: String,
    default: 'default'
  },
  // 输入框占位内容
  placeholder: {
    type: String,
    default: ''
  }
})
const $emits = defineEmits([
  'update:modelValue',
])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 工具栏配置
const toolbarConfig = {}
// 编辑器配置
const editorConfig = {
  placeholder: $props.placeholder
}
// 编辑器内容HTML
const valueHtml = ref($props.modelValue)


// 编辑器创建时
const handleCreated = (editor) => {
  editorRef.value = editor
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<template>
  <div class="comp_container wang_editor_comp">
    <Toolbar
      class="toolbar"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      class="editor"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<style scoped lang="scss">
.wang_editor_comp {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;

  .toolbar {
    border-bottom: 1px solid #ccc;
  }

  .editor {
    height: 500px;
    overflow-y: hidden;
  }
}
</style>