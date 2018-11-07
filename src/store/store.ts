import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './modules/types'
import { app } from './modules/app'
import { user } from './modules/user'
import { permission } from './modules/permission'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0'
  },
  modules: {
    app,
    user,
    permission
  }
}

export default new Vuex.Store<RootState>(store)
