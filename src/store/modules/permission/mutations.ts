import { MutationTree } from 'vuex'
import { PermissionState } from './types'
import { constantRouterMap } from '@/router/router'

export const mutations: MutationTree<PermissionState> = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers)
  }
}
