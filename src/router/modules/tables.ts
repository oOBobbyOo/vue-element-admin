import Layout from '@/views/layout/Layout.vue'

const tablesRouter = {
  path: '/tables',
  component: Layout,
  redirect: 'noredirect',
  name: 'Tables',
  meta: { title: 'Tables', icon: 'table' },
  children: [
    {
      path: 'simple',
      component: () => import('@/views/tables/simple.vue'),
      name: 'SimpleTable',
      meta: { title: 'Simple Table', noCache: true }
    },
    {
      path: 'dynamic',
      component: () => import('@/views/tables/dynamic.vue'),
      name: 'DynamicTable',
      meta: { title: 'Dynamic Table', noCache: true }
    }
  ]
}

export default tablesRouter
