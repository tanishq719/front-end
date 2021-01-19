<template>
  <div>
    <div class="header">
      <transition name="fade">
          <Alert v-if="getMessages.length > 0"/>
      </transition>
      <div @click="$router.replace('/')" class="logo-section">
        <img id="logo" src="../assets/logo.png" />
        <img id="full-form" src="../assets/full-form.png" />
      </div>
      <div class="about-us">
        <div >About us</div>
        <div >Help</div>
      </div>
      <div class="search-box">
        <input id="search" placeholder="Search" />
        <button id="sep">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </button>
      </div>
      <div class="quest">
        <button @click="$router.replace('/quest')" >ASK A QUESTION</button>
      </div>
      <div class="login-signup">
        <div class="auth" v-if="Object.keys(getUser()).length !== 0 && fetchUser()" id="user">
          <img :src="image">
          <p>{{username}}</p>
        </div>
        <div class="auth" v-else>
          <button @click="$router.replace('/login')">LOGIN</button>
          <button @click="$router.replace('/signup')">SIGNUP</button>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <!-- <Signup @toggle-change="signup=!signup" v-bind:toggle="signup"/> -->
  </div>
</template>

<script>
import Signup from './Signup'
import Login from './Login'
import Alert from './Alert'
import { mapGetters} from 'vuex'

export default {
  name: "myheader",
  components:{
    Signup,
    Login,
    Alert
  },
  data : function()
  {
    return {
      image:'',
      username:''
    }
  },
  methods:{
    ...mapGetters(['getUser']),
    fetchUser: function(){
      var i = this.getUser()["dp"];
      this.image = "http://127.0.0.1:8000/media/"+i.substr(1,i.length-2)
      this.username = this.getUser()["username"]
      console.log(this.image)
      return true
    }
  },
  computed: {
    ...mapGetters(['getMessages']),
    getMessageS: {
      //getter
      get: function(){return getMessages();},
      //setter
      set: function(value){
        console.log("inside setter")
      }
    }
    // debug: function(){
    //   console.log(this.getUser()["username"]);
    //   console.log(Object.keys(this.getUser()).length)

    // }
  }
  
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#logo {
  width: 80%;
  max-width: 90px;
}
#full-form {
  width: 100%;
  max-width: 90px;
}
.logo-section {
  display: flex;
  justify-content: center;
  align-self:flex-start;
  flex-direction: column;
  padding: 2px 2%;
  max-width: 100px;
  min-width: 100px;
}
.header {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* margin-top:-7px; */
  margin:0 10%;
}
.search-box {
  width: 30%;
  min-width: 200px;
  align-self: center;
  display: flex;
  justify-content:center;
  align-items: center;
  margin:auto;
  /* margin: 0px 100px; */
}
.search-box button {
  padding: 0px 5px 0px 5px;
  background-color: #f2ccb3;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-color: #f1ac6b;
  margin: 0%;
  width: 100%;
  max-width: 80px;
  border-style: solid;
  border-width: 2px;
  border-left: none;
  height: 34px;
}
#search {
  width: 100%;
  padding: 0px 10px;
  border-width: 2px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-color: #f1ac6b;
  border-style: solid;
  border-right: none;
  margin-right: 0px;
  height: 30px;
  font-size: 16px;
}
.about-us{
  display:flex;
  /* padding: 0px 20px; */
}
.about-us div{
  width: max-content;
  padding: 0px 20px;
}
.login-signup {
  /* width:40%; */
  margin:auto;
  display:flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin: 0;
}
.login-signup div {
  width:100%;
  text-align: center;
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
  margin:auto;
}
.login-signup button,.quest button{
  padding: 0px 10px 0px 10px;
  margin: 2%;
  background-color: #0a76cf;
  color: white;
  border-width: 2px;
  border-radius: 5px;
  border-color: #0a76cf;
  width: 100%;
  max-width: 120px;
  border-style: solid;
  text-align: center;
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
}
.quest button{
  background-image: radial-gradient(#a1a1a1 0%,#4e4e4e);
  border-color:#7a7979;
  color:white;
  font-size: 12px;
  border-width: 2px;
  height:35px;
}
.quest{
  margin:auto;
  /* padding-right: 20px; */
}
.auth{
  display:flex;
  flex-direction: row;
  align-items: center;
  padding:0px 10px;
  margin:auto;
}

.auth img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid black;
}

.auth p{
  padding:10px;
  margin:0px;
}
</style>