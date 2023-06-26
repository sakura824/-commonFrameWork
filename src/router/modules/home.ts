export default [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '',
    },
    redirect: '/home',
    children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: {
            title: '首页',
            icon: 'House'
          }
        },
    ]
  },
]