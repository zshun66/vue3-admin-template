export default {
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
    { required: true, message: '请选择菜单状态', trigger: 'change' }
  ],
  menus: [
    { required: true, message: '请选择菜单权限', trigger: 'change' }
  ]
}