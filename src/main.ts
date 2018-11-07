import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import * as ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './registerServiceWorker'

import './icons' // icon
import './permission' // permission control
import './mock' // simulation data

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
