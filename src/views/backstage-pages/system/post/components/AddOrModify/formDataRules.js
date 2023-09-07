export default {
  name: [
    { required: true, message: '请输入岗位名称', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入岗位编码', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请输入显示排序', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择岗位状态', trigger: 'change' }
  ],
  remark: []
}