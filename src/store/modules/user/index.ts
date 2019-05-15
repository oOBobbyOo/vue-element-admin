import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { UserState } from './types'
import { RootState } from '../types'
import { getToken } from '@/utils/auth'
const token = getToken() ? getToken() : ''

export const state: UserState = {
  token,
  name: '',
  introduction: '',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: []
}

const namespaced: boolean = true

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
