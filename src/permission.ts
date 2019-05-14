import router from './router/router'
import store from './store/store'

import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/auth'

// permission judge function
function hasPermission(roles: any, permissionRoles: any) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some((role: any) => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/register', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters['user/roles'].length === 0) {
        store
          .dispatch('user/getUserInfo')
          .then((res: any) => {
            const roles = res.roles
            store.dispatch('permission/GenerateRoutes', { roles }).then(() => {
              router.addRoutes(store.getters['permission/addRouters'])
              next({ ...to, replace: true })
            })
          })
          .catch((err: any) => {
            store.dispatch('user/FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters['user/roles'], to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true })
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next() // 在免登录白名单，直接进入
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
