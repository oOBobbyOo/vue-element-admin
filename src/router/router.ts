import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout.vue'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index.vue') },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true
  }
]

export const asyncRouterMap = [
  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'Charts',
    meta: { title: 'charts', icon: 'chart' },
    children: [
      {
        path: 'keyboard',
        component: () => import('@/views/charts/keyboard.vue'),
        name: 'KeyboardChart',
        meta: { title: 'keyboardChart', noCache: true }
      },
      {
        path: 'line',
        component: () => import('@/views/charts/line.vue'),
        name: 'LineChart',
        meta: { title: 'lineChart', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})
