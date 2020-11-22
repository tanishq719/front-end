import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/User'
import message from './modules/Message'
import post from './modules/Post'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user,
        message,
        post
    },
    plugins:[createPersistedState()]
})

// use localStorage.clear() whenever this needs to refresh by erasing previous data