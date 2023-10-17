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
    redirect: '/backstage/home',
    component: () => import('@/views/backstage/backstage.vue'),
    children: []
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