import { GetterTree } from 'vuex'
import { UserState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<UserState, RootState> = {
  avatar: state => state.avatar,
  roles: state => state.roles
}
