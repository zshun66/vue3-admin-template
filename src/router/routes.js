export default [
  {
    path: '/',
    redirect: '/login',
  },
  { // 登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/backstage',
    name: 'backstage',
    component: () => import('@/views/backstage/backstage.vue'),
    children: [
      {
        path: '/backstage/system/menu',
        name: 'menu',
        component: () => import('@/views/backstage-pages/system/menu/menu.vue'),
      },
      {
        path: '/backstage/system/role',
        name: 'role',
        component: () => import('@/views/backstage-pages/system/role/role.vue'),
      },
    ]
  },
  { // 404路由
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404/404.vue'),
  },
  { // 通配路由
    path: '/:pathMatch(.*)*',
    name: 'any',
    redirect: '/404',
  }
]