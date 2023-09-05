/**
 * 菜单项信息
 * parentId					父级菜单ID
 * parentTitle			父级菜单标题
 * menuId						菜单ID
 * type							菜单类型(directory目录、menu菜单、button按钮)
 * title						菜单标题
 * icon							菜单图标
 * sort							菜单排序
 * isLink						是否外链
 * path							路由路径
 * component				组件路径
 * perms						权限字符
 * isCache					是否缓存
 * visible					显示状态
 * status						菜单状态
 */

export default [
  {	// 系统管理
    parentId: 0,
    parentTitle: null,
    menuId: 1,
    type: 'directory',
    title: '系统管理',
    icon: 'system1',
    sort: 1,
    isLink: '0',
    path: 'system',
    component: null,
    perms: 'system:manage',
    isCache: '1',
    visible: '1',
    status: '1',
    children: [
      {
        parentId: 1,
        parentTitle: '系统管理',
        menuId: 11,
        type: 'menu',
        title: '菜单管理',
        icon: 'menu3',
        sort: 1,
        isLink: '0',
        path: 'system/menu',
        component: 'backstage-pages/system/menu/menu',
        perms: 'system:menu:page',
        isCache: '1',
        visible: '1',
        status: '1',
        children: []
      },
      {
        parentId: 1,
        parentTitle: '系统管理',
        menuId: 12,
        type: 'menu',
        title: '角色管理',
        icon: 'role1',
        sort: 2,
        isLink: '0',
        path: 'system/role',
        component: 'backstage-pages/system/role/role',
        perms: 'system:role:page',
        isCache: '1',
        visible: '1',
        status: '1',
        children: []
      },
      {
        parentId: 1,
        parentTitle: '系统管理',
        menuId: 15,
        type: 'menu',
        title: '用户管理',
        icon: 'user1',
        sort: 5,
        isLink: '0',
        path: 'system/user',
        component: 'backstage-pages/system/user/user',
        perms: 'system:user:page',
        isCache: '1',
        visible: '1',
        status: '1',
        children: []
      },
    ]
  },
]