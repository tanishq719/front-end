import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/User'
import message from './modules/Message'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user,
        message
    }
})