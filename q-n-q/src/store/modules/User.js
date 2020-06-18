import axios from 'axios';

const userState = {
    obj: {
        username: "",
        first_name: "",
        last_name:"",
        email:"",
        password:"",
        description:"",
        imageFile:""
    }
};

const userGetters = {
    getUser(state){
        return state.obj;
    }
};

const userActions = {
    async loginUser({commit, dispatch},cred){
      const userobj = await axios.post('http://localhost:8000/users/login/',{
        username : cred.username,
        password : cred.password
      }).catch(error=>{
        dispatch('insertMessages({"type":"error","note":"server error"})')
      })

      commit('saveUser',userobj)
    }
};

const userMutations = {
    saveUser : (state,userobj) => state.obj = userobj
};

export default {
    state: userState,
    getters: userGetters,
    actions: userActions,
    mutations: userMutations
};