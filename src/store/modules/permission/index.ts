import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { PermissionState } from './types'
import { RootState } from '../types'

import { constantRouterMap } from '@/router/router'

export const state: PermissionState = {
  routers: constantRouterMap,
  addRouters: []
}

const namespaced: boolean = true

export const permission: Module<PermissionState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
