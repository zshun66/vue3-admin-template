/**
 * 菜单项信息
 * parentId			    父级菜单ID
 * parentTitle			父级菜单标题
 * id						    菜单ID
 * sort							菜单排序
 * type							菜单类型(directory目录、menu菜单、button按钮)
 * title						菜单标题
 * icon							菜单图标
 * iconSize					菜单图标大小
 * isLink						是否外链(1是 0否)
 * path							路由路径
 * name             路由名称
 * component				组件路径
 * perms						权限字符
 * isCache					是否缓存(1是 0否)
 * isVisible				是否菜单栏可见(1是 0否)
 * isClearable      是否可关闭(1是 0否)
 * status						菜单状态(1正常 0禁用)
 * children         子菜单列表
 * creator          创建者
 * createTime       创建时间
 */
const menuItemObj = {
  parentId: 0,
  parentTitle: null,
  id: null,
  sort: 1,
  type: 'directory',
  title: '',
  icon: '',
  iconSize: '20px',
  isLink: '0',
  path: '',
  name: '',
  component: null,
  perms: '',
  isCache: '1',
  isVisible: '1',
  isClearable: '1',
  status: '1',
  children: [],
  creator: '超级管理员',
  createTime: '2023-11-13 17:08:36'
}

// 深拷贝
const deepCopy = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 菜单列表
const menuList = [
  // 首页 ----------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: 99,
    sort: 1,
    type: 'menu',
    title: '首页',
    icon: 'home1',
    iconSize: '18px',
    path: 'home',
    name: 'home',
    component: 'backstage-pages/home/home',
    perms: 'home:manage',
  }),
  // 控制台菜单 ---------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: 1,
    sort: 10,
    title: '控制台',
    icon: 'console1',
    iconSize: '18px',
    path: 'dashboard',
    name: 'dashboard',
    perms: 'dashboard:manage',
    children: [
      Object.assign(deepCopy(menuItemObj), {
        parentId: 1,
        parentTitle: '控制台',
        id: 11,
        sort: 10,
        type: 'menu',
        title: '工作台',
        icon: 'work1',
        iconSize: '16px',
        path: 'dashboard/workbenches',
        name: 'dashboard:workbenches',
        component: 'backstage-pages/dashboard/workbenches/workbenches',
        perms: 'dashboard:workbenches:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: 1,
        parentTitle: '控制台',
        id: 12,
        sort: 20,
        type: 'menu',
        title: '监控台',
        icon: 'monitor1',
        iconSize: '16px',
        path: 'dashboard/monitor',
        name: 'dashboard:monitor',
        component: 'backstage-pages/dashboard/monitor/monitor',
        perms: 'dashboard:monitor:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: 1,
        parentTitle: '控制台',
        id: 13,
        sort: 30,
        type: 'menu',
        title: '分析台',
        icon: 'analysis1',
        path: 'dashboard/analysis',
        name: 'dashboard:analysis',
        component: 'backstage-pages/dashboard/analysis/analysis',
        perms: 'dashboard:analysis:page',
      })
    ]
  }),
  // 系统管理菜单 -----------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: 2,
    sort: 20,
    title: '系统管理',
    icon: 'system1',
    path: 'system',
    name: 'system',
    perms: 'system:manage',
    children: [
      Object.assign(deepCopy(menuItemObj), {
        parentId: 2,
        parentTitle: '系统管理',
        id: 21,
        sort: 10,
        type: 'menu',
        title: '菜单管理',
        icon: 'menu3',
        path: 'system/menu',
        name: 'system:menu',
        component: 'backstage-pages/system/menu/menu',
        perms: 'system:menu:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: 2,
        parentTitle: '系统管理',
        id: 22,
        sort: 20,
        type: 'menu',
        title: '角色管理',
        icon: 'role1',
        path: 'system/role',
        name: 'system:role',
        component: 'backstage-pages/system/role/role',
        perms: 'system:role:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: 2,
        parentTitle: '系统管理',
        id: 23,
        sort: 30,
        type: 'menu',
        title: '部门管理',
        icon: 'role1',
        path: 'system/dept',
        name: 'system:dept',
        component: 'backstage-pages/system/dept/dept',
        perms: 'system:dept:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: 2,
        parentTitle: '系统管理',
        id: 24,
        sort: 40,
        type: 'menu',
        title: '岗位管理',
        icon: 'role1',
        path: 'system/post',
        name: 'system:post',
        component: 'backstage-pages/system/post/post',
        perms: 'system:post:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: 2,
        parentTitle: '系统管理',
        id: 25,
        sort: 50,
        type: 'menu',
        title: '用户管理',
        icon: 'user1',
        path: 'system/user',
        name: 'system:user',
        component: 'backstage-pages/system/user/user',
        perms: 'system:user:page',
      })
    ]
  })
]

export default menuList