import { ActionTree } from 'vuex'
import { PermissionState } from './types'
import { RootState } from '../types'

import { asyncRouterMap } from '@/router/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: any, route: any) {
  if (route.meta && route.meta.roles) {
    return roles.some((role: any) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: any, roles: any) {
  const res: any[] = []
  routes.forEach((route: any) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

export const actions: ActionTree<PermissionState, RootState> = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessRoutes
      if (roles.includes('admin')) {
        accessRoutes = asyncRouterMap
      } else {
        accessRoutes = filterAsyncRoutes(asyncRouterMap, roles)
      }
      commit('SET_ROUTERS', accessRoutes)
      resolve(accessRoutes)
    })
  }
}
