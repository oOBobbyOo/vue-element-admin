import Cookies from 'js-cookie'

import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { AppState } from './types'
import { RootState } from '../types'

const sidebarStatus = Cookies.get('sidebarStatus') === '1' ? true : false

export const state: AppState = {
  sidebar: { opened: !sidebarStatus, withoutAnimation: false },
  device: 'desktop'
}

const namespaced: boolean = true

export const app: Module<AppState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
