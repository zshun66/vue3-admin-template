const menuItemObj = {
  parentId: '0',
  parentTitle: null,
  id: '',
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

// 所有菜单列表
const menuListAll = [
  // 首页 --------------------------------------------------------------------------------------------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: '99',
    sort: 1,
    type: 'menu',
    title: '首页',
    icon: 'home1',
    iconSize: '18px',
    path: '/backstage/home',
    name: 'backstage:home',
    component: 'backstage-pages/home/home',
    perms: 'backstage:home:manage',
  }),
  // 控制台菜单 --------------------------------------------------------------------------------------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: '1',
    sort: 10,
    title: '控制台',
    icon: 'console1',
    iconSize: '18px',
    path: '/backstage/dashboard',
    name: 'backstage:dashboard',
    perms: 'backstage:dashboard:manage',
    children: [
      Object.assign(deepCopy(menuItemObj), {
        parentId: '1',
        parentTitle: '控制台',
        id: '11',
        sort: 10,
        type: 'menu',
        title: '工作台',
        icon: 'work1',
        iconSize: '16px',
        path: '/backstage/dashboard/workbenches',
        name: 'backstage:dashboard:workbenches',
        component: 'backstage-pages/dashboard/workbenches/workbenches',
        perms: 'backstage:dashboard:workbenches:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '1',
        parentTitle: '控制台',
        id: '12',
        sort: 20,
        type: 'menu',
        title: '监控台',
        icon: 'monitor1',
        iconSize: '16px',
        path: '/backstage/dashboard/monitor',
        name: 'backstage:dashboard:monitor',
        component: 'backstage-pages/dashboard/monitor/monitor',
        perms: 'backstage:dashboard:monitor:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '1',
        parentTitle: '控制台',
        id: '13',
        sort: 30,
        type: 'menu',
        title: '分析台',
        icon: 'analysis1',
        path: '/backstage/dashboard/analysis',
        name: 'backstage:dashboard:analysis',
        component: 'backstage-pages/dashboard/analysis/analysis',
        perms: 'backstage:dashboard:analysis:page',
      })
    ]
  }),
  // 系统管理菜单 -------------------------------------------------------------------------------------------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: '2',
    sort: 20,
    title: '系统管理',
    icon: 'system1',
    path: '/backstage/system',
    name: 'backstage:system',
    perms: 'backstage:system:manage',
    children: [
      Object.assign(deepCopy(menuItemObj), {
        parentId: '2',
        parentTitle: '系统管理',
        id: '21',
        sort: 10,
        type: 'menu',
        title: '菜单管理',
        icon: 'menu3',
        path: '/backstage/system/menu',
        name: 'backstage:system:menu',
        component: 'backstage-pages/system/menu/menu',
        perms: 'backstage:system:menu:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '2',
        parentTitle: '系统管理',
        id: '22',
        sort: 20,
        type: 'menu',
        title: '角色管理',
        icon: 'role1',
        path: '/backstage/system/role',
        name: 'backstage:system:role',
        component: 'backstage-pages/system/role/role',
        perms: 'backstage:system:role:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '2',
        parentTitle: '系统管理',
        id: '23',
        sort: 30,
        type: 'menu',
        title: '部门管理',
        icon: 'dept1',
        path: '/backstage/system/dept',
        name: 'backstage:system:dept',
        component: 'backstage-pages/system/dept/dept',
        perms: 'backstage:system:dept:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '2',
        parentTitle: '系统管理',
        id: '24',
        sort: 40,
        type: 'menu',
        title: '岗位管理',
        icon: 'post1',
        path: '/backstage/system/post',
        name: 'backstage:system:post',
        component: 'backstage-pages/system/post/post',
        perms: 'backstage:system:post:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '2',
        parentTitle: '系统管理',
        id: '25',
        sort: 50,
        type: 'menu',
        title: '用户管理',
        icon: 'user1',
        path: '/backstage/system/user',
        name: 'backstage:system:user',
        component: 'backstage-pages/system/user/user',
        perms: 'backstage:system:user:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '2',
        parentTitle: '系统管理',
        id: '26',
        sort: 60,
        type: 'menu',
        title: '字典管理',
        icon: 'dict1',
        path: '/backstage/system/dict',
        name: 'backstage:system:dict',
        component: 'backstage-pages/system/dict/dict',
        perms: 'backstage:system:dict:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '2',
        parentTitle: '系统管理',
        id: '27',
        sort: 70,
        type: 'menu',
        title: '参数管理',
        icon: 'param1',
        iconSize: '16px',
        path: '/backstage/system/param',
        name: 'backstage:system:param',
        component: 'backstage-pages/system/param/param',
        perms: 'backstage:system:param:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '2',
        parentTitle: '系统管理',
        id: '28',
        sort: 80,
        type: 'menu',
        title: '通知公告',
        icon: 'notice1',
        path: '/backstage/system/notice',
        name: 'backstage:system:notice',
        component: 'backstage-pages/system/notice/notice',
        perms: 'backstage:system:notice:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '2',
        parentTitle: '系统管理',
        id: '30',
        sort: 100,
        type: 'directory',
        title: '日志管理',
        icon: 'log1',
        iconSize: '16px',
        path: '/backstage/system/log',
        name: 'backstage:system:log',
        perms: 'backstage:system:log:manage',
        children: [
          Object.assign(deepCopy(menuItemObj), {
            parentId: '30',
            parentTitle: '日志管理',
            id: '301',
            sort: 10,
            type: 'menu',
            title: '登录日志',
            icon: 'loginlog1',
            iconSize: '18px',
            path: '/backstage/system/log/loginlog',
            name: 'backstage:system:log:loginlog',
            component: 'backstage-pages/system/log/loginlog/loginlog',
            perms: 'backstage:system:loginlog:page',
          }),
          Object.assign(deepCopy(menuItemObj), {
            parentId: '30',
            parentTitle: '日志管理',
            id: '302',
            sort: 20,
            type: 'menu',
            title: '操作日志',
            icon: 'operlog1',
            iconSize: '21px',
            path: '/backstage/system/log/operlog',
            name: 'backstage:system:log:operlog',
            component: 'backstage-pages/system/log/operlog/operlog',
            perms: 'backstage:system:operlog:page',
          }),
          Object.assign(deepCopy(menuItemObj), {
            parentId: '30',
            parentTitle: '日志管理',
            id: '303',
            sort: 30,
            type: 'menu',
            title: '错误日志',
            icon: 'errorlog1',
            iconSize: '16px',
            path: '/backstage/system/log/errorlog',
            name: 'backstage:system:log:errorlog',
            component: 'backstage-pages/system/log/errorlog/errorlog',
            perms: 'backstage:system:errorlog:page',
          }),
        ]
      })
    ]
  })
]

export default menuListAll