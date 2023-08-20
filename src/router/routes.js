export const constantRoutes = [
  {
    path: '/',
    redirect: '/login',
  },
  { // 登录
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    name: 'login'
  },
  { // 登录成功后展示数据的路由
    path: '/backstage',
    component: () => import('@/views/backstage/backstage.vue'),
    name: 'backstage'
  },
  { // 404路由
    path: '/404',
    component: () => import('@/views/error/404/404.vue'),
    name: '404'
  },
  { // 通配路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any'
  }
]