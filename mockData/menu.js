/**
 * 菜单项信息
 * parentId			    父级菜单ID
 * parentTitle			父级菜单标题
 * id						    菜单ID
 * sort							菜单排序
 * type							菜单类型(directory目录、menu菜单、button按钮)
 * title						菜单标题
 * icon							菜单图标
 * isLink						是否外链(1是 0否)
 * path							路由路径
 * component				组件路径
 * perms						权限字符
 * isCache					是否缓存(1是 0否)
 * isVisible				是否菜单栏可见(1是 0否)
 * status						菜单状态(1正常 0禁用)
 * children         子菜单列表
 */
const menuItemObj = {
  parentId: 0,
  parentTitle: null,
  id: null,
  sort: 1,
  type: 'directory',
  title: '',
  icon: '',
  isLink: '0',
  path: '',
  component: null,
  perms: '',
  isCache: '1',
  isVisible: '1',
  status: '1',
  children: []
}

// 深拷贝
const deepCopy = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 菜单列表
const menuList = [
  // 系统管理菜单 -----------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: 1,
    sort: 10,
    title: '系统管理',
    icon: 'system1',
    path: 'system',
    perms: 'system:manage',
    children: [
      Object.assign(deepCopy(menuItemObj), {
        parentId: 1,
        parentTitle: '系统管理',
        id: 11,
        sort: 10,
        type: 'menu',
        title: '菜单管理',
        icon: 'menu3',
        path: 'system/menu',
        component: 'backstage-pages/system/menu/menu',
        perms: 'system:menu:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: 1,
        parentTitle: '系统管理',
        id: 12,
        sort: 20,
        type: 'menu',
        title: '角色管理',
        icon: 'role1',
        path: 'system/role',
        component: 'backstage-pages/system/role/role',
        perms: 'system:role:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: 1,
        parentTitle: '系统管理',
        id: 15,
        sort: 50,
        type: 'menu',
        title: '用户管理',
        icon: 'user1',
        path: 'system/user',
        component: 'backstage-pages/system/user/user',
        perms: 'system:user:page',
      })
    ]
  })
]

export default menuList