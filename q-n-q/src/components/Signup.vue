<template>
    <div >
        <div class="blur-back">
            <div class="form">
                <img @click="$router.replace('/')" src = "../assets/clear.png"/>
                <div id="inputs">
                    <div id="part1">
                        <label >Username</label>
                        <input v-model="username" placeholder=Username>
                        <label>First Name</label>
                        <input v-model="first_name" placeholder=Firstname>
                        <label>Last Name</label>
                        <input v-model="last_name" placeholder=Lastname>
                        <label>Email</label>
                        <input v-model="email" placeholder=Email>
                        <label>Password</label>
                        <input v-model="password" type='password' placeholder=Password>
                        <label>Confirm Password</label>
                        <input v-model="password2" type='password' placeholder='Confirm Password'>
                    </div>
                    <div id="part2">
                        <div id="part2-prof">
                            <label>Profile Picture</label>
                            <img v-if="imageData.length > 0" :src="imageData">
                            <img v-else src="../assets/user.png">
                                <label class="custom-file-upload">
                                    <input  @change="getSource" type="file"/>
                                        Upload Profile Pic
                                </label>
                        </div>
                        <div id="part2-descr">
                            <label>Description about you</label>
                            <textarea v-model="description" rows=6 placeholder=Description> </textarea>
                        </div>
                    </div>
                </div>
                <input @click="register" type=reset value=Register>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from './Alert'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "signup",
  components:{
      Alert
  },
  data:function(){
      return {
          username:"",
          first_name:"",
          last_name:"",
          email:"",
          password:"",
          password2:"",
          description:"",
          imageData:"",
          imageFile:""
      }
  },
  methods:{
        ...mapActions(['insertMessages']),
        getSource : function(event){
            const input = event.target;
            this.imageFile = input.files[0] 
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData= e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
            console.log(this.imageData);
        },
        register : async function(event){
            // this.msg.push("{type:'success',note:'registerd'")
            const formdata = new FormData()
            formdata.append('username',this.username)
            formdata.append('first_name', this.first_name)
            formdata.append('last_name',this.last_name)
            formdata.append('email', this.email)
            formdata.append('password', this.password)
            formdata.append('password2', this.password2)
            formdata.append('description', this.description)
            formdata.append('dp', this.imageFile)

            await this.$http.post('http://localhost:8000/users/register/',
            // {
            //     username: this.username,
            //     first_name: this.first_name,
            //     last_name: this.last_name,
            //     email: this.email,
            //     password: this.password,
            //     password2: this.password2,
            //     description: this.description,
            //     dp: this.imageFile
            // },
            // // x-www-form-urlencoded
            // {
            //     headers:{ 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'}
            // }
                formdata
            ).then(response=>{
                if (response.status === 200){
                    console.log("successfull")
                    var msg = []
                    msg.push({'type':'success','note': response.data.response})
                    msg.push({'type':'success','note':'Taking to Login page....'})
                    this.insertMessages(msg)
                    setTimeout(()=>{
                        this.$router.replace('/login')
                    },5000)
                }
                console.log(response)
            }).catch(error=>{
                if(error.response.status === 422){
                    console.error("unsuccessful")
                    console.error(error.response.data.message)
                    var msg = []
                    var m = ""
                    for(var field in error.response.data){
                        m = field+":"+error.response.data[field]
                        msg.push({'type':'error','note': m})
                    }
                    this.insertMessages(msg)
                }
                else{
                    console.error("different error")
                    var msg = []
                    msg.push({'type':'error','note': 'some error at server, please try again'})
                    this.insertMessages(msg)
                }
                console.log(error)
                })
        }
    },
    created(){
            // console.log("inside created : ")
            // console.log(this.msg)
            // this.msg.push({'type':'success','note':'registerd'})
            // this.msg.push({'type':'error','note':'registerd'})
    }
    // computed: mapGetters(['getMessages'])
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
input[type="file"] {
    display: none;
}
.custom-file-upload {
    border: 1px solid #ccc;
    border-style:block;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    margin-top:2%;
}
#part2 img{
    width:50%;
    height: 80%;
    border-radius:50%;
    border:3px solid rgb(145, 144, 144);
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
    width:70%;
    flex-direction: column;
    max-width: 1000px;
    margin-top:5%;
}
#inputs{
    display:flex;
    flex-direction: row;
    opacity:100;
    box-shadow: #ccc;
}
#part1,#part2{
    display:flex;
    flex-direction: column;
    width:50%;
    justify-content: space-between;
    padding:2%;
}
#part1 input{
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
#part2-descr textarea{
    padding:2%;
    margin:auto;
    border-radius: 7px;
    border-style: solid;
    border-color: #0a234d;
    border-width: 2%;
    resize: none;
    width:100%;
}
#part2-prof{
    width: 100%;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: inherit;
}
#part2-prof div{
    align-items:center;
    display: inherit;
}

#part2-descr{
    align-self: flex-end;
    width:100%;
}
.form label{
    padding-left:2%;
    font-family: "Quicksand", sans-serif;
}


</style>