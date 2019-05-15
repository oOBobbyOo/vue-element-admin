import Layout from '@/views/layout/Layout.vue'

const errorsRouter = {
  path: '/errors',
  component: Layout,
  redirect: 'noredirect',
  name: 'Errors',
  meta: { title: 'errors', icon: '404' },
  children: [
    {
      path: '401',
      component: () => import('@/views/errorPage/401.vue'),
      name: 'Page401',
      meta: { title: '401 page', noCache: true }
    },
    {
      path: '404',
      component: () => import('@/views/errorPage/404.vue'),
      name: 'Page404',
      meta: { title: '404 page', noCache: true }
    }
  ]
}

export default errorsRouter
