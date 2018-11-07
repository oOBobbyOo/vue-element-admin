import { GetterTree } from 'vuex'
import { PermissionState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<PermissionState, RootState> = {
  permission_routers: state => state.routers,
  addRouters: state => state.addRouters
}
