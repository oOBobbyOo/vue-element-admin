import { ActionTree } from 'vuex'
import { AppState } from './types'
import { RootState } from '../types'

export const actions: ActionTree<AppState, RootState> = {
  toggleSideBar({ commit }): any {
    commit('TOGGLE_SIDEBAR')
  }
}
