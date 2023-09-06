<script setup name="AddOrModify">
import rules from './formDataRules.js'

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
    default: () => ({})
  },
  menuTree: {
    type: Array,
    default: () => ([])
  }
})
const $emits = defineEmits([
  'update:modelValue'
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
const formDataRules = ref(rules)
// 菜单树形数据
const menuTreeData = computed(() => {
  const result = [{}]
  result[0]['menuId'] = 0
  result[0]['title'] = '主类目'
  result[0]['children'] = $props.menuTree
  return result
})
// 菜单树选择器实例
const menuTreeSelectRef = ref(null)


watch(() => $props.form, (newv, oldv) => {
  formData.value = JSON.parse(JSON.stringify($props.form))
}, { deep: true })

// 当前选中节点变化时触发的事件
const handleTreeSelectCurrentChange = function (data, node) {
  formData.value.parentId = data.menuId
  menuTreeSelectRef.value.blur()
}

// 取消
const handleCancel = function() {
  showDialog.value = false
}

// 确定
const handleConfirm = function() {
  console.log(formData.value)
  showDialog.value = false
}

// 关闭弹框
const handleDialogClosed = function() {
  formData.value = JSON.parse(JSON.stringify($props.form))
}
</script>

<template>
  <div class="comp_container addormodify_comp">
    <el-dialog
      v-model="showDialog"
      width="650px"
      top="15vh"
      :append-to-body="false"
      :close-on-click-modal="false"
      :draggable="true"
      @closed="handleDialogClosed"
    >
      <template #header>
        <div v-if="type === 'add'">
          <span>添加菜单</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
        <div v-if="type === 'modify'">
          <span>修改菜单</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
      </template>

      <el-form class="form" :model="formData" :rules="formDataRules" label-width="auto">
        <el-form-item label="父级菜单:" prop="parentId">
          <el-tree-select
            class="form_width"
            ref="menuTreeSelectRef"
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
          <el-select class="form_width" v-model="formData.type">
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
        <el-form-item label="菜单图标:" prop="icon" v-if="['directory', 'menu'].includes(formData.type)">
          <el-input
            class="form_width"
            v-model="formData.icon"
            clearable
            placeholder="请输入菜单图标"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单标题:" prop="title">
          <el-input
            class="form_width"
            v-model="formData.title"
            clearable
            placeholder="请输入菜单标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否外链:" prop="isLink" v-if="['directory', 'menu'].includes(formData.type)">
          <el-select class="form_width" v-model="formData.isLink" :disabled="formData.type === 'directory'">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 100%;" label="路由路径:" prop="path" v-if="['directory', 'menu'].includes(formData.type)">
          <el-input
            class="form_width"
            v-model="formData.path"
            clearable
            placeholder="请输入路由路径"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%;" label="组件路径:" prop="component" v-if="['menu'].includes(formData.type)">
          <el-input
            class="form_width"
            v-model="formData.component"
            clearable
            placeholder="请输入组件路径"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限字符:" prop="perms" v-if="['menu', 'button'].includes(formData.type)">
          <el-input
            class="form_width"
            v-model="formData.perms"
            clearable
            placeholder="请输入权限字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="显隐状态:" prop="visible" v-if="['directory', 'menu'].includes(formData.type)">
          <el-select class="form_width" v-model="formData.visible">
            <el-option label="显示" value="1"></el-option>
            <el-option label="隐藏" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否缓存:" prop="isCache" v-if="['menu'].includes(formData.type)">
          <el-select class="form_width" v-model="formData.isCache">
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
.addormodify_comp {
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