const msgState = {
    msg:[]
}

const msgGetters = {
    getMessages : state => state.msg
}

const msgActions = {
    insertMessages : ({commit},msg) => {
        commit('setMessages',msg)
        setTimeout(()=>{
            commit('deleteMsgMutation')
        },5000)
    },
}

const msgMutations = {
    setMessages: (state,msg) => state.msg = state.msg.concat(msg),
    deleteMsgMutation : state => state.msg = []
}

export default {
    state : msgState,
    getters : msgGetters,
    actions : msgActions,
    mutations : msgMutations
}
