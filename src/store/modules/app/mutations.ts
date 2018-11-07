import { MutationTree } from 'vuex'
import { AppState } from './types'

import Cookies from 'js-cookie'

export const mutations: MutationTree<AppState> = {
  TOGGLE_SIDEBAR(state) {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1')
    } else {
      Cookies.set('sidebarStatus', '0')
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  }
}
