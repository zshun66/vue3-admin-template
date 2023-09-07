export default {
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
}