import { ActionTree } from 'vuex'
import { PermissionState } from './types'
import { RootState } from '../types'

import { asyncRouterMap } from '@/router/router'
import { filterAsyncRouter } from '@/utils'

export const actions: ActionTree<PermissionState, RootState> = {
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { roles } = data
      let accessedRouters
      if (roles.includes('admin')) {
        accessedRouters = asyncRouterMap
      } else {
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
      }
      commit('SET_ROUTERS', accessedRouters)
      resolve()
    })
  }
}
