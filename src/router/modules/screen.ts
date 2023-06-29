export default [
//   {
//     path: '/screen',
//     component: () => import('@/layout/index.vue'),
//     name: 'test1',
//     meta: {
//       title: '',
//     },
//     children: [
//     ]
// },
{
  path: '/screen',
  name: 'test1',
  component: () => import('@/views/Screen/index.vue'),
  meta: {
    title: '数据大屏',
    icon: 'Platform'
  }
}
]