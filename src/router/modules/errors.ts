import Layout from '@/views/layout/Layout.vue'

const errorsRouter = {
  path: '/errors',
  component: Layout,
  redirect: 'noredirect',
  name: 'Errors',
  meta: { title: 'Errors', icon: '404' },
  children: [
    {
      path: '401',
      component: () => import('@/views/errorPage/401.vue'),
      name: 'Page401',
      meta: { title: '401', noCache: true }
    },
    {
      path: '404',
      component: () => import('@/views/errorPage/404.vue'),
      name: 'Page404',
      meta: { title: '404', noCache: true }
    }
  ]
}

export default errorsRouter
