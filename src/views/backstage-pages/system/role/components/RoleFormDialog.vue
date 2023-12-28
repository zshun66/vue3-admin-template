<script setup name="RoleFormDialog">
import { reqMenuListAll } from '@/api/system/menu.js'
import { extractKeyNamesFromTree } from '@/utils/utils.js'

const $props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'add'
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
// 菜单数据
const menuData = ref([])
// 表单实例
const roleFormRef = ref(null)
// 表单数据
const formData = ref(null)
// 表单数据验证规则
const formDataRules = ref({
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ],
  perms: [
    { required: true, message: '请输入权限字符', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请输入显示排序', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择角色状态', trigger: 'change' }
  ],
  menuIds: [
    { required: true, message: '请选择菜单权限', trigger: 'change' }
  ],
  remark: []
})
// 菜单树组件实例
const menuTreeRef = ref(null)
// 展开/折叠(true展开、false折叠)
const isExpand = ref(false)
// 全选状态(true全选、false全不选)
const isAllSelect = ref(false)
// 父子联动状态(true联动、false不联动)
const isLinkage = ref(true)


// 获取菜单列表(全部)
const getMenuListAll = async function() {
  if (menuData.value.length > 0) return
  const { result } = await reqMenuListAll()
  if (!result) return
  menuData.value = result.data || []
}

// 初始化表单数据
const initFormData = function() {
  formData.value = {
    name: '',
    perms: '',
    sort: null,
    status: '1',
    menuIds: [],
    remark: ''
  }
}

// 取消
const handleCancel = function() {
  showDialog.value = false
}

// 确定
const handleConfirm = async function() {
  const valid = await roleFormRef.value.validate().catch(err => {})
  if (!valid) return
  console.log(formData.value)
  showDialog.value = false
  ElMessage.success('操作成功')
  $emits('success')
}

// 打开弹框时
const handleDialogOpen = function() {
  getMenuListAll()
  if ($props.type === 'add') {
    
  } else if ($props.type === 'edit') {
    for (let key in formData.value) {
      formData.value[key] = $props.row[key]
    }
    menuTreeRef.value.setCheckedKeys(formData.value.menuIds)
    const allKeyLength = extractKeyNamesFromTree(menuData.value, 'id').length
    const checkedKeyLength = formData.value.menuIds.length
    if (allKeyLength === checkedKeyLength) isAllSelect.value = true
  }
}

// 关闭弹框时
const handleDialogClosed = function() {
  initFormData()
  roleFormRef.value.resetFields()
  menuTreeRef.value.setCheckedKeys([])
  isExpand.value = false
  isAllSelect.value = false
}

// 点击节点复选框之后触发
const handleMenuTreeCheckChange = function() {
  formData.value.menuIds = menuTreeRef.value.getCheckedKeys()
  if (formData.value.menuIds.length > 0) {
    roleFormRef.value.clearValidate('menuIds')
  } else {
    roleFormRef.value.validateField('menuIds').catch(err => {})
  }
}

watch(isExpand, (newv, oldv) => {
  const keys = extractKeyNamesFromTree(menuData.value, 'id')
  keys.forEach(key => menuTreeRef.value.getNode(key).expanded = newv)
})
watch(isAllSelect, (newv, oldv) => {
  const checkedKeys = newv ? extractKeyNamesFromTree(menuData.value, 'id') : []
  menuTreeRef.value.setCheckedKeys(checkedKeys)
  handleMenuTreeCheckChange()
})

initFormData()
</script>

<template>
  <div class="comp_container role_form_dialog_comp">
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
          <span>添加角色</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
        <div v-if="type === 'edit'">
          <span>修改角色</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
      </template>

      <el-form class="form" ref="roleFormRef" :model="formData" :rules="formDataRules" label-width="auto">
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
        <el-form-item label="角色名称:" prop="name">
          <el-input
            class="form_width"
            v-model="formData.name"
            clearable
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限字符:" prop="perms">
          <el-input
            class="form_width"
            v-model="formData.perms"
            clearable
            placeholder="请输入权限字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色状态:" prop="status">
          <el-select class="form_width" v-model="formData.status">
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 100%;" label="菜单权限:" prop="menuIds">
          <div>
            <el-checkbox v-model="isExpand" label="展开/折叠" />
            <el-checkbox v-model="isAllSelect" label="全选/全不选" />
            <el-checkbox v-model="isLinkage" label="父子联动" />
          </div>
          <el-tree
            class="menu_tree"
            ref="menuTreeRef"
            :data="menuData"
            node-key="id"
            show-checkbox
            :props="{
              label: 'title',
              children: 'children',
            }"
            :check-strictly="!isLinkage"
            @check="handleMenuTreeCheckChange"
          ></el-tree>
        </el-form-item>
        <el-form-item style="width: 100%;" label="备注:" prop="remark">
          <el-input
            class="form_width"
            v-model="formData.remark"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 3 }"
            clearable
            placeholder="请输入备注"
          ></el-input>
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
.role_form_dialog_comp {
  .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .form_width {
      width: 100%;
    }

    .menu_tree {
      width: 100%;
      height: 300px;
      padding: 10px 0;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      overflow-y: auto;
    }

    :deep(.el-form-item) {
      width: 48%;
    }

    :deep(.el-input__inner) {
      text-align: left;
    }
  }

  :deep(.el-dialog) {
    border-radius: 7px;
  }

  :deep(.el-dialog__headerbtn) {
    top: 0px;
  }

  :deep(.el-dialog__body) {
    padding: 20px 35px 20px 30px;
  }

  :deep(.el-dialog__footer) {
    text-align: center;
  }
}
</style>