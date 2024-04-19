<script setup name="MenuFormDialog">
const $props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'add'
  },
  menuTree: {
    type: Array,
    default: () => ([])
  },
  row: {
    type: Object,
    default: () => ({})
  }
})
const $emits = defineEmits([
  'update:modelValue',
  'confirm'
])

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
const formData = ref(null)
// 表单数据验证规则
const formDataRules = ref({
  parentId: [
    { required: true, message: '请选择父级菜单', trigger: 'change' }
  ],
  type: [
    { required: true, message: '请选择菜单类型', trigger: 'change' }
  ],
  sort: [
    { required: true, message: '请输入显示排序', trigger: 'blur' }
  ],
  title: [
    { required: true, message: '请输入菜单标题', trigger: 'blur' }
  ],
  icon: [
    { required: true, message: '请输入菜单图标', trigger: 'blur' }
  ],
  iconSize: [
    { required: true, message: '请输入图标大小', trigger: 'blur' }
  ],
  isLink: [
    { required: true, message: '请选择是否外链', trigger: 'change' }
  ],
  path: [
    { required: true, message: '请输入路由路径', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入路由名称', trigger: 'blur' }
  ],
  component: [
    { required: true, message: '请输入组件路径', trigger: 'blur' }
  ],
  perms: [
    { required: true, message: '请输入权限字符', trigger: 'blur' }
  ],
  isCache: [
    { required: true, message: '请选择是否缓存', trigger: 'change' }
  ],
  isVisible: [
    { required: true, message: '请选择显示状态', trigger: 'change' }
  ],
  isClearable: [
    { required: true, message: '请选择关闭状态', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择菜单状态', trigger: 'change' }
  ],
})
// 菜单树形数据
const menuTreeData = computed(() => {
  const result = [{}]
  result[0]['id'] = 0
  result[0]['title'] = '主类目'
  result[0]['children'] = $props.menuTree
  return result
})
// 表单实例
const menuFormRef = ref(null)
// 菜单树选择器实例
const menuTreeSelectRef = ref(null)


// 初始化表单数据
const initFormData = function() {
  formData.value = {
    parentId: 0,
    type: 'directory',
    sort: null,
    title: '',
    icon: '',
    iconSize: '20px',
    isLink: '0',
    path: '',
    name: '',
    component: '',
    perms: '',
    isCache: '1',
    isVisible: '1',
    isClearable: '1',
    status: '1',
  }
}

// 打开弹框时
const handleDialogOpen = function() {
  if ($props.type === 'add') {
    formData.value.parentId = ($props.row && $props.row.id) || 0
  } else if ($props.type === 'edit') {
    for (let key in formData.value) {
      formData.value[key] = $props.row[key]
    }
  }
}

// 当前选中节点变化时触发的事件
const handleTreeSelectCurrentChange = function(data, node) {
  formData.value.parentId = data.id
  menuTreeSelectRef.value.blur()
}

// 选择的菜单类型改变时
const handleTypeChange = function(value) {
  for (let key in formDataRules.value) {
    formDataRules.value[key][0].required = true
  }
  if (value === 'directory') { // 目录
    formDataRules.value.isLink[0].required = false
    formDataRules.value.name[0].required = false
    formDataRules.value.component[0].required = false
    formDataRules.value.isCache[0].required = false
    formDataRules.value.isClearable[0].required = false
  } else if (value === 'button') { // 按钮
    formDataRules.value.icon[0].required = false
    formDataRules.value.iconSize[0].required = false
    formDataRules.value.isLink[0].required = false
    formDataRules.value.name[0].required = false
    formDataRules.value.path[0].required = false
    formDataRules.value.component[0].required = false
    formDataRules.value.isVisible[0].required = false
    formDataRules.value.isCache[0].required = false
    formDataRules.value.isClearable[0].required = false
  } else if (value === 'menu') { // 菜单
  }
}

// 取消
const handleCancel = function() {
  showDialog.value = false
}

// 确定
const handleConfirm = async function() {
  const valid = await menuFormRef.value.validate().catch(err => {})
  if (!valid) return
  console.log(formData.value)
  showDialog.value = false
  ElMessage.success('操作成功')
  $emits('success')
}

// 关闭弹框时
const handleDialogClosed = function() {
  initFormData()
  menuFormRef.value.resetFields()
}

initFormData()
handleTypeChange(formData.value.type)
</script>

<template>
  <div class="comp_container menu_form_dialog_comp">
    <el-dialog
      v-model="showDialog"
      width="650px"
      top="15vh"
      :append-to-body="false"
      :close-on-click-modal="false"
      :draggable="true"
      @open="handleDialogOpen"
      @closed="handleDialogClosed"
    >
      <template #header>
        <div v-if="type === 'add'">
          <span>添加菜单</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
        <div v-if="type === 'edit'">
          <span>修改菜单</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
      </template>

      <el-form
        class="form" ref="menuFormRef" :model="formData" :rules="formDataRules"
        label-width="auto" :validate-on-rule-change="false" scroll-to-error
        :scroll-into-view-options="{ behavior: 'smooth', block: 'center', inline: 'nearest' }"
      >
        <el-form-item style="width: 100%;" label="父级菜单:" prop="parentId">
          <el-tree-select
            class="form_width"
            ref="menuTreeSelectRef"
            v-model="formData.parentId"
            :data="menuTreeData"
            node-key="id"
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
          <el-select class="form_width" v-model="formData.type" :validate-event="false" @change="handleTypeChange">
            <el-option label="目录" value="directory"></el-option>
            <el-option label="菜单" value="menu"></el-option>
            <el-option label="按钮" value="button"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示排序:" prop="sort">
          <el-input-number
            class="form_width"
            v-model="formData.sort"
            :min="0"
            step-strictly
            controls-position="right"
            placeholder="请输入显示排序"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="菜单标题:" prop="title">
          <el-input
            class="form_width"
            v-model="formData.title"
            clearable
            placeholder="请输入菜单标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单图标:" prop="icon">
          <el-input
            class="form_width"
            v-model="formData.icon"
            clearable
            placeholder="请输入菜单图标"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标大小:" prop="iconSize">
          <el-input
            class="form_width"
            v-model="formData.iconSize"
            clearable
            placeholder="请输入图标大小"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否外链:" prop="isLink">
          <el-select class="form_width" v-model="formData.isLink">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 100%;" label="路由名称:" prop="name">
          <el-input
            class="form_width"
            v-model="formData.name"
            clearable
            placeholder="请输入路由名称"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%;" label="路由路径:" prop="path">
          <el-input
            class="form_width"
            v-model="formData.path"
            clearable
            placeholder="请输入路由路径"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%;" label="权限字符:" prop="perms">
          <el-input
            class="form_width"
            v-model="formData.perms"
            clearable
            placeholder="请输入权限字符"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%;" label="组件路径:" prop="component">
          <el-input
            class="form_width"
            v-model="formData.component"
            clearable
            placeholder="请输入组件路径"
          ></el-input>
        </el-form-item>
        <el-form-item label="显隐状态:" prop="isVisible">
          <el-select class="form_width" v-model="formData.isVisible">
            <el-option label="显示" value="1"></el-option>
            <el-option label="隐藏" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否缓存:" prop="isCache">
          <el-select class="form_width" v-model="formData.isCache">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可否关闭:" prop="isClearable">
          <el-select class="form_width" v-model="formData.isClearable">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单状态:" prop="status">
          <el-select class="form_width" v-model="formData.status">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="info" plain @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.menu_form_dialog_comp {
  .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    :deep(.el-form-item) {
      width: 48%;
    }

    :deep(.el-input__inner) {
      text-align: left;
    }

    .form_width {
      width: 100%;
    }
  }

  :deep(.el-dialog__footer) {
    text-align: center;
  }
}
</style>