import axios from 'axios';

// axios.defaults.withCredentials = true
// axios.defaults.origin = "http://mysite.com:8080"


const userState = {
    obj: {},
    authInstance: {}
};

const userGetters = {
    getUser : state =>  state.obj,
    getAxios : state => state.instance
};

const userActions = {
    async setInterceptors()
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
          // if(error.response.status === 401 && error.response.data['tried'] !== 'true')
            return axios.create().post('http://localhost:8000/users/token/refresh/',{'access_token':localStorage.getItem('http_token')},{withCredentials:true})
                    .then(res=>{
                      if(res.status === 201){
                        localStorage.setItem('httponly_token',res.data.access)
                        console.log('token reset')
                      }
                    })
                    .catch(err=>{
                      console.log('retry......')
                    })
          }
      )
    },
    async callProfile({dispatch}){
        console.log("inside")
        const msg = await axios.post('http://localhost:8000/users/profile/',{},{withCredentials : true})
        .catch(err=>{
          console.log(err)
        })
        dispatch('insertMessages',{'type':'success','note':msg.data['data']})
    },

    async loginUser({commit,dispatch},cred){
      const response = await axios.post('http://localhost:8000/users/login/',{
        username : cred.username,
        password : cred.password
      }
      ,{withCredentials:true}
      ).catch(error=>{
        var msg = []
        var m = ""
        for(var field in error.response.data){
            m = field+":"+error.response.data[field]
            msg.push({'type':'error','note': m})
        }
        dispatch('insertMessages',msg)
      })
      console.log(response)
      if (response.data.user){
        dispatch('insertMessages',{'type':'success','note':response.data.msg})
        commit('saveUser',response.data)
      }
    }
};

const userMutations = {
    saveUser : (state,data) => {
      localStorage.setItem('httponly_token',data.access)
      console.log('1 saveUser')
      state.obj = data.user
    }
};

export default {
    state: userState,
    getters: userGetters,
    actions: userActions,
    mutations: userMutations
};