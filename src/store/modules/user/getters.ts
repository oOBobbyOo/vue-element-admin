import { GetterTree } from 'vuex'
import { UserState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<UserState, RootState> = {
  token: state => state.token,
  name: state => state.name,
  introduction: state => state.introduction,
  avatar: state => state.avatar,
  roles: state => state.roles
}
