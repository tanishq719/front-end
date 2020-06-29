<template>
  <div>
    <div class="blur-back">
      <div class="form inputs">
        <img @click="$router.replace('/')" src="../assets/clear.png" />
        <label >Username</label>
        <input v-model="username" placeholder=Username>
        <label>Password</label>
        <input v-model="password" type=password placeholder=Password>
        <input @click="login({'username':username,'password':password})" type=reset value=Login>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "login",
  data:function(){
    return {
      username:"",
      password:""
    }
  },
  methods:{
    ...mapActions(['loginUser','callProfile','setInterceptors']),
    login : function(cred){
      this.loginUser(cred).then(()=> this.setInterceptors())
      .then(()=>{
        setTimeout(()=>{
          this.callProfile()
        },10000)
        })
      .catch(err=>console.log(err))
      this.$router.replace('/')
    }
     // loginUser: this.$store.dispatch('loginUser') 
  } 
};
</script>

<style scoped>
.form > img{
    width:10%;
    max-width:40px;
    position:relative;
    align-self:flex-end;
    margin-bottom:-7%;
}
.blur-back{
    position:absolute;
    width:99%;
    height:99%;
    background-color: rgb(216, 222, 232,0.8);
    top:0;
    align-items:center;
    display:flex;
}
.form{
    background-color: white;
    border-radius:5px;
    padding:2%;
    margin:auto;
    display:flex;
    justify-content:center;
    width:50%;
    flex-direction: column;
    max-width: 300px;
}
#inputs{
    display:flex;
    flex-direction: row;
    opacity:100;
    box-shadow: #ccc;
}
input{
    padding:2%;
    margin:2%;
    border-radius: 7px;
    border-style: solid;
    border-color: #0a234d;
    border-width: 2%;
}
.form input[type=reset]{
    padding: 0px 10px 0px 10px;
    margin: auto;
    margin-top:2%;
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
.form label{
    padding-left:2%;
    font-family: "Quicksand", sans-serif;
}
</style>