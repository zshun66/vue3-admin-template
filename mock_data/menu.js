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
    component: 'backpages/home/home',
    perms: 'backstage:home:page',
    isClearable: '0'
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
        component: 'backpages/dashboard/workbenches/workbenches',
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
        component: 'backpages/dashboard/monitor/monitor',
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
        component: 'backpages/dashboard/analysis/analysis',
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
        component: 'backpages/system/menu/menu',
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
        component: 'backpages/system/role/role',
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
        component: 'backpages/system/dept/dept',
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
        component: 'backpages/system/post/post',
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
        component: 'backpages/system/user/user',
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
        component: 'backpages/system/dict/dict',
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
        component: 'backpages/system/param/param',
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
        component: 'backpages/system/notice/notice',
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
            component: 'backpages/system/log/loginlog/loginlog',
            perms: 'backstage:system:loginlog:page',
            isCache: '0'
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
            component: 'backpages/system/log/operlog/operlog',
            perms: 'backstage:system:operlog:page',
            isCache: '0'
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
            component: 'backpages/system/log/errorlog/errorlog',
            perms: 'backstage:system:errorlog:page',
            isCache: '0'
          }),
        ]
      })
    ]
  }),
  // 系统工具 --------------------------------------------------------------------------------------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: '90',
    sort: 900,
    type: 'directory',
    title: '系统工具',
    icon: 'tool1',
    iconSize: '18px',
    path: '/backstage/systool',
    name: 'backstage:systool',
    perms: 'backstage:systool',
    children: [
      Object.assign(deepCopy(menuItemObj), {
        parentId: '90',
        parentTitle: '系统工具',
        id: '901',
        sort: 10,
        type: 'directory',
        title: '表单生成器',
        icon: 'form2',
        iconSize: '18px',
        path: '/backstage/systool/form-generator',
        name: 'backstage:systool:form-generator',
        perms: 'backstage:systool:form-generator',
        children: [
          Object.assign(deepCopy(menuItemObj), {
            parentId: '901',
            parentTitle: '表单生成器',
            id: '9011',
            sort: 10,
            type: 'menu',
            title: 'VForm设计器',
            icon: 'form1',
            iconSize: '17px',
            path: '/backstage/systool/form-generator/vform-designer',
            name: 'backstage:systool:form-generator:vform-designer',
            component: 'backpages/systool/form-generator/vform-designer/vform-designer',
            perms: 'backstage:systool:form-generator:vform-designer:page',
          }),
          Object.assign(deepCopy(menuItemObj), {
            parentId: '901',
            parentTitle: '表单生成器',
            id: '9012',
            sort: 20,
            type: 'menu',
            title: 'VForm渲染器',
            icon: 'form1',
            iconSize: '17px',
            path: '/backstage/systool/form-generator/vform-renderer',
            name: 'backstage:systool:form-generator:vform-renderer',
            component: 'backpages/systool/form-generator/vform-renderer/vform-renderer',
            perms: 'backstage:systool:form-generator:vform-renderer:page',
          }),
        ]
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '90',
        parentTitle: '系统工具',
        id: '902',
        sort: 20,
        type: 'menu',
        title: '代码生成器',
        icon: 'code1',
        iconSize: '16px',
        path: '/backstage/systool/code-generator',
        name: 'backstage:systool:code-generator',
        component: 'backpages/systool/code-generator/code-generator',
        perms: 'backstage:systool:code-generator:page',
      }),
    ]
  }),
  // 外部链接 --------------------------------------------------------------------------------------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: '91',
    sort: 910,
    type: 'directory',
    title: '外部链接',
    icon: 'link3',
    iconSize: '19px',
    path: '/backstage/outlink',
    name: 'backstage:outlink',
    perms: 'backstage:outlink',
    children: [
      Object.assign(deepCopy(menuItemObj), {
        parentId: '91',
        parentTitle: '外部链接',
        id: '911',
        sort: 10,
        type: 'menu',
        title: 'Bind内嵌',
        icon: 'link1',
        iconSize: '20px',
        path: '/backstage/outlink/bind',
        name: 'backstage:outlink:bind',
        component: 'backpages/outlink/bind/bind',
        perms: 'backstage:systool:bind:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '91',
        parentTitle: '外部链接',
        id: '912',
        sort: 20,
        type: 'menu',
        title: 'Gitee仓库',
        icon: 'gitee1',
        iconSize: '18px',
        path: 'https://gitee.com/zshun66/vue3-admin-template',
        name: 'backstage:outlink:gitee',
        component: 'backpages/outlink/gitee/gitee',
        perms: 'backstage:systool:gitee:page',
        isLink: '1'
      }),
    ]
  }),
  // 自定义指令 --------------------------------------------------------------------------------------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: '92',
    sort: 920,
    type: 'directory',
    title: '自定义指令',
    icon: 'vue1',
    iconSize: '16px',
    path: '/backstage/directive',
    name: 'backstage:directive',
    perms: 'backstage:directive',
    children: [
      Object.assign(deepCopy(menuItemObj), {
        parentId: '92',
        parentTitle: '自定义指令',
        id: '921',
        sort: 10,
        type: 'menu',
        title: '权限指令',
        icon: 'perms1',
        iconSize: '17px',
        path: '/backstage/directive/perms',
        name: 'backstage:directive:perms',
        component: 'backpages/directive/perms/perms',
        perms: 'backstage:directive:perms:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '92',
        parentTitle: '自定义指令',
        id: '922',
        sort: 20,
        type: 'menu',
        title: '角色指令',
        icon: 'role1',
        iconSize: '18px',
        path: '/backstage/directive/role',
        name: 'backstage:directive:role',
        component: 'backpages/directive/role/role',
        perms: 'backstage:directive:role:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '92',
        parentTitle: '自定义指令',
        id: '923',
        sort: 30,
        type: 'menu',
        title: '复制指令',
        icon: 'copy1',
        iconSize: '16px',
        path: '/backstage/directive/copy',
        name: 'backstage:directive:copy',
        component: 'backpages/directive/copy/copy',
        perms: 'backstage:directive:copy:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '92',
        parentTitle: '自定义指令',
        id: '924',
        sort: 40,
        type: 'menu',
        title: '水印指令',
        icon: 'watermark1',
        iconSize: '18px',
        path: '/backstage/directive/watermark',
        name: 'backstage:directive:watermark',
        component: 'backpages/directive/watermark/watermark',
        perms: 'backstage:directive:watermark:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '92',
        parentTitle: '自定义指令',
        id: '953',
        sort: 50,
        type: 'menu',
        title: '拖拽指令',
        icon: 'draggable1',
        iconSize: '15px',
        path: '/backstage/directive/draggable',
        name: 'backstage:directive:draggable',
        component: 'backpages/directive/draggable/draggable',
        perms: 'backstage:directive:draggable:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '92',
        parentTitle: '自定义指令',
        id: '926',
        sort: 60,
        type: 'menu',
        title: '长按指令',
        icon: 'longpress1',
        iconSize: '18px',
        path: '/backstage/directive/longpress',
        name: 'backstage:directive:longpress',
        component: 'backpages/directive/longpress/longpress',
        perms: 'backstage:directive:longpress:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '92',
        parentTitle: '自定义指令',
        id: '927',
        sort: 70,
        type: 'menu',
        title: '防抖指令',
        icon: 'js1',
        iconSize: '15px',
        path: '/backstage/directive/debounce',
        name: 'backstage:directive:debounce',
        component: 'backpages/directive/debounce/debounce',
        perms: 'backstage:directive:debounce:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '92',
        parentTitle: '自定义指令',
        id: '928',
        sort: 80,
        type: 'menu',
        title: '节流指令',
        icon: 'js1',
        iconSize: '15px',
        path: '/backstage/directive/throttle',
        name: 'backstage:directive:throttle',
        component: 'backpages/directive/throttle/throttle',
        perms: 'backstage:directive:throttle:page',
      }),
    ]
  }),
  // 全局组件 --------------------------------------------------------------------------------------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: '93',
    sort: 930,
    type: 'directory',
    title: '全局组件',
    icon: 'component1',
    iconSize: '18px',
    path: '/backstage/component',
    name: 'backstage:component',
    perms: 'backstage:component',
    children: [
      Object.assign(deepCopy(menuItemObj), {
        parentId: '93',
        parentTitle: '全局组件',
        id: '931',
        sort: 10,
        type: 'menu',
        title: '分类筛选器',
        icon: 'filter1',
        iconSize: '20px',
        path: '/backstage/component/classifyfilter',
        name: 'backstage:component:classifyfilter',
        component: 'backpages/component/classifyfilter/classifyfilter',
        perms: 'backstage:component:classifyfilter:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '93',
        parentTitle: '全局组件',
        id: '932',
        sort: 20,
        type: 'menu',
        title: '图标选择器',
        icon: 'filter1',
        iconSize: '20px',
        path: '/backstage/component/iconselect',
        name: 'backstage:component:iconselect',
        component: 'backpages/component/iconselect/iconselect',
        perms: 'backstage:component:iconselect:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '93',
        parentTitle: '全局组件',
        id: '933',
        sort: 30,
        type: 'menu',
        title: '引导页',
        icon: 'guide1',
        iconSize: '20px',
        path: '/backstage/component/stepguide',
        name: 'backstage:component:stepguide',
        component: 'backpages/component/stepguide/stepguide',
        perms: 'backstage:component:stepguide:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '93',
        parentTitle: '全局组件',
        id: '934',
        sort: 40,
        type: 'menu',
        title: '富文本编辑器',
        icon: 'richtext1',
        iconSize: '22px',
        path: '/backstage/component/wangeditor',
        name: 'backstage:component:wangeditor',
        component: 'backpages/component/wangeditor/wangeditor',
        perms: 'backstage:component:wangeditor:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '93',
        parentTitle: '全局组件',
        id: '935',
        sort: 50,
        type: 'menu',
        title: 'SVG图标',
        icon: 'svg1',
        iconSize: '16px',
        path: '/backstage/component/svgicon',
        name: 'backstage:component:svgicon',
        component: 'backpages/component/svgicon/svgicon',
        perms: 'backstage:component:svgicon:page',
      }),
    ]
  }),
  // 菜单嵌套 --------------------------------------------------------------------------------------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: '101',
    sort: 1010,
    type: 'directory',
    title: '菜单嵌套',
    icon: 'menu3',
    iconSize: '19px',
    path: '/backstage/nesting',
    name: 'backstage:nesting',
    perms: 'backstage:nesting',
    children: [
      Object.assign(deepCopy(menuItemObj), {
        parentId: '101',
        parentTitle: '菜单嵌套',
        id: '1011',
        sort: 10,
        type: 'menu',
        title: '二级菜单1',
        icon: 'menu3',
        iconSize: '19px',
        path: '/backstage/nesting/twomenu1',
        name: 'backstage:nesting:twomenu1',
        component: 'backpages/nesting/twomenu1/twomenu1',
        perms: 'backstage:nesting:twomenu1:page',
      }),
      Object.assign(deepCopy(menuItemObj), {
        parentId: '101',
        parentTitle: '菜单嵌套',
        id: '1012',
        sort: 20,
        type: 'directory',
        title: '二级菜单2',
        icon: 'menu3',
        iconSize: '19px',
        path: '/backstage/nesting/twomenu2',
        name: 'backstage:nesting:twomenu2',
        perms: 'backstage:nesting:twomenu2',
        children: [
          Object.assign(deepCopy(menuItemObj), {
            parentId: '1012',
            parentTitle: '二级菜单2',
            id: '10121',
            sort: 10,
            type: 'menu',
            title: '三级菜单1',
            icon: 'menu3',
            iconSize: '19px',
            path: '/backstage/nesting/twomenu2/threemenu1',
            name: 'backstage:nesting:twomenu2:threemenu1',
            component: 'backpages/nesting/twomenu2/threemenu1/threemenu1',
            perms: 'backstage:nesting:twomenu2:threemenu1:page',
          }),
          Object.assign(deepCopy(menuItemObj), {
            parentId: '1012',
            parentTitle: '二级菜单2',
            id: '10122',
            sort: 20,
            type: 'menu',
            title: '三级菜单2',
            icon: 'menu3',
            iconSize: '19px',
            path: '/backstage/nesting/twomenu2/threemenu2',
            name: 'backstage:nesting:twomenu2:threemenu2',
            component: 'backpages/nesting/twomenu2/threemenu2/threemenu2',
            perms: 'backstage:nesting:twomenu2:threemenu2:page',
          }),
        ]
      }),
    ]
  }),
  // 关于项目 -------------------------------------------------------------------------------------------------------------------------------------------------
  Object.assign(deepCopy(menuItemObj), {
    id: '100',
    sort: 1000,
    type: 'menu',
    title: '关于项目',
    icon: 'about1',
    iconSize: '19px',
    path: '/backstage/about',
    name: 'backstage:about',
    component: 'backpages/about/about',
    perms: 'backstage:about:page',
    children: []
  })
]

export default menuListAll