import router from './router/router'
import store from './store/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/getPageTitle'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// permission judge function
function hasPermission(roles: any, permissionRoles: any) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some((role: any) => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/register', '/forgetPwd', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length === 0
      if (hasRoles) {
        store
          .dispatch('user/getUserInfo')
          .then((res: any) => {
            const roles = res.roles
            store.dispatch('permission/generateRoutes', roles).then(() => {
              router.addRoutes(store.getters['permission/addRouters'])
              next({ ...to, replace: true })
            })
          })
          .catch((err: any) => {
            store.dispatch('user/fedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
      } else {
        if (hasPermission(store.getters['user/roles'], to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true })
        }
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
  // finish progress bar
  NProgress.done()
})
