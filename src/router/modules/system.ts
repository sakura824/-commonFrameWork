export default [
    {
      path: '/system',
      name: 'Acl',
      component: () => import('@/layout/index.vue'),
      meta: {
          icon: 'Setting',
        title: '系统管理'
      },
      redirect: '/system/user',
        children: [
            {
                path: '/system/user',
                component: () => import('@/views/System/user/index.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    icon: 'User'
                }
            },
            {
                path: '/system/role',
                component: () => import('@/views/System/role/index.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    icon: 'UserFilled'
                }
            },
            {
                path: '/system/permission',
                component: () => import('@/views/System/permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    icon: 'Monitor'
                }
            }
        ]
    },
  ]