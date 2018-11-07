import { GetterTree } from 'vuex'
import { AppState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<AppState, RootState> = {
  sidebar: state => state.sidebar,
  device: state => state.device
}
