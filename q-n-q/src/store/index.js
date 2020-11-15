import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/User'
import message from './modules/Message'
import post from './modules/Post'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user,
        message,
        post
    }
})