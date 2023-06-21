export default [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      meta: {
        title: '首页'
      }
    },
  ]