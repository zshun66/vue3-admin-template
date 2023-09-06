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
const formDataRules = ref(rules)


watch(() => $props.form, (newv, oldv) => {
  formData.value = JSON.parse(JSON.stringify($props.form))
}, { deep: true })

// 取消
const handleCancel = function() {
  showDialog.value = false
}

// 确定
const handleConfirm = function() {
  console.log(formData.value)
  showDialog.value = false
  $emits('confirm')
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
          <span>添加角色</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
        <div v-if="type === 'modify'">
          <span>修改角色</span>
          <span style="color: #f00;">(*为必填项)</span>
        </div>
      </template>

      <el-form class="form" :model="formData" :rules="formDataRules" label-width="auto">
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
        <el-form-item label="菜单权限:" prop="menus">
          
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