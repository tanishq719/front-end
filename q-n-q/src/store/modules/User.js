import axios from 'axios';
import router from '@/router'

// axios.defaults.withCredentials = true
// axios.defaults.origin = "http://mysite.com:8080"

const userState = {
    obj: {},
    authInstance: {}
};

const userGetters = {
    getUser : state =>  {console.log(state.obj);return state.obj || {};},
    getAxios : state => state.instance
};

const userActions = {
    async setInterceptors({dispatch})
    {
      axios.interceptors.request.use(
        config=>{
          console.log('2 saveUser')
          if(config.method == 'post'){
            console.log('3 saveUser')
            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('httponly_token')
            console.log('4 saveUser')
            config.withCredentials = true
            return config
          }
        },
        error=>{
          console.log('5 saveUser')
          Promise.reject(error)
        }
      )

      axios.interceptors.response.use(
        response=>{return response},
        error=>{
          console.log(error)
          if(error.response.status === 401){
            return axios.create().post('http://localhost:8000/users/token/refresh/'
            ,{'access_token':localStorage.getItem('httponly_token')}
            ,{withCredentials:true})
                    .then(res=>{
                      if(res.status === 201){
                        localStorage.setItem('httponly_token',res.data.access)
                        console.log('token reset')
                      }
                    })
                    .catch(err=>{
                      console.log('retry......')
                      if (err.response.status === 403){
                        dispatch('insertMessages',{'type':'warning','note':err.response.data.msg})
                      }
                    })
          }
        }
      )
    },
    async callProfile({dispatch}){
        console.log("inside")
        axios.post('http://localhost:8000/users/profile/',{},{withCredentials : true})
        .then(res=>{

        })
        .catch(err=>{
          console.log(err)
        })
        if (msg){
          dispatch('insertMessages',{'type':'success','note':msg.data['data']})
        }
    },

    async loginUser({commit,dispatch},cred){
      axios.post('http://localhost:8000/users/login/',{
        username : cred.username,
        password : cred.password
      }
      ,{withCredentials:true}
      )
      .then(res=>{
        console.log(res)
        router.push('/')
        dispatch('insertMessages',{'type':'success','note':res.data.msg})
        dispatch('setInterceptors')
        commit('saveUser',res.data)
      })
      .catch(error=>{
        var msg = [];
        var m = "";
        for(var field in error.response.data){
            m = field+":"+error.response.data[field]
            msg.push({'type':'error','note': m})
        }
        dispatch('insertMessages',msg);
      })
      .catch(err=>{
        var msg = [{'type':'error','note': 'You are offline !!'}]
        console.log(msg)
        dispatch('insertMessages',msg)
    })
  }
};

const userMutations = {
    initializeUserStore: (state) => state.obj = JSON.parse(localStorage.getItem('user')),
    saveUser : (state,data) => {
      localStorage.setItem('httponly_token',data.access)
      console.log('1 saveUser')
      console.log(data.user)
      localStorage.setItem('user',JSON.stringify(data.user))
      state.obj = data.user
    }
};

export default {
    state: userState,
    getters: userGetters,
    actions: userActions,
    mutations: userMutations
};