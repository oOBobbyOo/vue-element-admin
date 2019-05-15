import { ActionTree } from 'vuex'
import { UserState } from './types'
import { RootState } from '../types'

import { login, register, getUserInfo, forgetPwd, logOut } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'

export const actions: ActionTree<UserState, RootState> = {
  // 用户登录
  async login({ commit }, user) {
    try {
      const { data } = await login(user)
      commit('SET_TOKEN', data.token)
      setToken(data.token)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // 用户注册
  async register({ commit }, user) {
    try {
      const { data } = await register(user)
      commit('SET_TOKEN', data.token)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // 获取用户信息
  async getUserInfo({ commit, state }) {
    try {
      const { data } = await getUserInfo(state.token)

      // 验证返回的roles是否是一个非空数组
      const hasRoles = data.roles && data.roles.length > 0
      if (hasRoles) {
        commit('SET_ROLES', data.roles)
      } else {
        return 'getInfo: roles must be a non-null array !'
      }

      commit('SET_NAME', data.name)
      commit('SET_AVATAR', data.avatar)
      commit('SET_INTRODUCTION', data.introduction)
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // 忘记密码
  async forgetPwd({ commit }, user) {
    try {
      await forgetPwd(user)
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // 登出
  async logOut({ commit }) {
    try {
      await logOut()
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // 前端登出
  fedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}
