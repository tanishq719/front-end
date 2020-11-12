import Vue from 'vue'
import Home from './Home'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

export const bus = new Vue({})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Home)
})
