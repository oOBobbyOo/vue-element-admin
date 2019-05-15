import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Layout
import Layout from '@/views/layout/Layout.vue'

// Async Router Modules
import chartsRouter from './modules/charts'
import tablesRouter from './modules/tables'
import errorsRouter from './modules/errors'

// Constant Router
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
        meta: { title: 'Dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index.vue') },
  { path: '/register', component: () => import('@/views/register/index.vue') },
  { path: '/forgetPwd', component: () => import('@/views/forgetPwd/index.vue') },
  { path: '/401', component: () => import('@/views/errorPage/401.vue'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404.vue'), hidden: true }
]

// Async Router
export const asyncRouterMap = [
  {
    path: '/icons',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index.vue'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },
  chartsRouter,
  tablesRouter,
  errorsRouter
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})
