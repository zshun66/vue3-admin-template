<script setup name="AddOrModify">
const $props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'add'
  },
  form: {
    type: Object,
    default: () => {}
  },
  menuTree: {
    type: Array,
    default: () => []
  }
})
const $emits = defineEmits(['update:modelValue'])

// 是否显示弹框
const showDialog = computed({
  get() {
    return $props.modelValue
  },
  set(value) {
    $emits('update:modelValue', value)
  }
})
// 表单数据
const formData = ref(JSON.parse(JSON.stringify($props.form)))
// 表单数据验证规则
const formDataRules = ref({
  parentId: [
    { required: true, message: '请选择父级菜单', trigger: 'change' }
  ],
  icon: [
    { required: true, message: '请输入菜单图标', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择菜单类型', trigger: 'change' }
  ],
  title: [
    { required: true, message: '请输入菜单标题', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请输入显示排序', trigger: 'blur' }
  ],
  isLink: [
    { required: true, message: '请选择是否外链', trigger: 'change' }
  ],
  path: [
    { required: true, message: '请输入路由路径', trigger: 'blur' }
  ],
  component: [
    { required: true, message: '请输入组件路径', trigger: 'blur' }
  ],
  perms: [
    { required: true, message: '请输入权限字符', trigger: 'blur' }
  ],
  visible: [
    { required: true, message: '请选择显示状态', trigger: 'change' }
  ],
  isCache: [
    { required: true, message: '请选择是否缓存', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择菜单状态', trigger: 'change' }
  ],
})
// 菜单树形数据
const menuTreeData = computed(() => {
  const result = [
    {
      parentId: null,
      parentTitle: null,
      menuId: 0,
      title: '主类目',
      children: $props.menuTree
    }
  ]
  return result
})


// 当前选中节点变化时触发的事件
const handleTreeSelectCurrentChange = function (data, node) {
  formData.value.parentId = data.menuId
}

// 取消
const handleCancel = function () {
  showDialog.value = false
}

// 确定
const handleConfirm = function () {
  console.log(formData.value)
  showDialog.value = false
}
</script>

<template>
  <el-dialog
    class="comp_container addormodify_comp"
    v-model="showDialog"
    width="650px"
    top="15vh"
    :append-to-body="false"
    :close-on-click-modal="false"
    :draggable="true"
  >
    <template #header>
      <span v-if="type === 'add'">添加菜单</span>
      <span v-if="type === 'modify'">修改菜单</span>
    </template>
    <el-form class="form" :model="formData" :rules="formDataRules" label-width="auto">
      <el-form-item label="父级菜单:" prop="parentId">
        <el-tree-select
          style="width: 200px;"
          v-model="formData.parentId"
          :data="menuTreeData"
          node-key="menuId"
          render-after-expand
          :expand-on-click-node="false"
          :props="{
            label: 'title',
            children: 'children'
          }"
          placeholder="请选择上级菜单"
          @current-change="handleTreeSelectCurrentChange"
        ></el-tree-select>
      </el-form-item>
      <el-form-item label="菜单类型:" prop="type">
        <el-select style="width: 200px;" v-model="formData.type">
          <el-option label="目录" value="directory"></el-option>
          <el-option label="菜单" value="menu"></el-option>
          <el-option label="按钮" value="button"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示排序:" prop="sort">
        <el-input-number
          style="width: 200px;"
          v-model="formData.sort"
          :min="0"
          step-strictly
          controls-position="right"
          placeholder="请输入显示排序"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="菜单图标:" prop="icon">
        <el-input
          style="width: 200px;"
          v-model="formData.icon"
          clearable
          placeholder="请输入菜单图标"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单标题:" prop="title">
        <el-input
          style="width: 200px;"
          v-model="formData.title"
          clearable
          placeholder="请输入菜单标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否外链:" prop="isLink">
        <el-select style="width: 200px;" v-model="formData.isLink">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路由路径:" prop="path">
        <el-input
          style="width: 505px;"
          v-model="formData.path"
          clearable
          placeholder="请输入路由路径"
        ></el-input>
      </el-form-item>
      <el-form-item label="组件路径:" prop="component">
        <el-input
          style="width: 505px;"
          v-model="formData.component"
          clearable
          placeholder="请输入组件路径"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限字符:" prop="perms">
        <el-input
          style="width: 200px;"
          v-model="formData.perms"
          clearable
          placeholder="请输入权限字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="显隐状态:" prop="visible">
        <el-select style="width: 200px;" v-model="formData.visible">
          <el-option label="显示" value="1"></el-option>
          <el-option label="隐藏" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否缓存:" prop="isCache">
        <el-select style="width: 200px;" v-model="formData.isCache">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单状态:" prop="status">
        <el-select style="width: 200px;" v-model="formData.status">
          <el-option label="正常" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="text-align: center;">
        <el-button type="info" plain icon="icon-close" @click="handleCancel">取消</el-button>
        <el-button type="primary" icon="icon-check" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.addormodify_comp {
  .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    :deep(.el-input-number .el-input__inner) {
      text-align: left;
    }
  }
}
</style>