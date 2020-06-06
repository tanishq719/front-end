<template>
    <div >
        <div v-if="toggle" v-bind:class = "{'blur-back':toggle}">
            <div class="form">
                <div id="inputs">
                    <div id="part1">
                        <label >Username</label>
                        <input placeholder=Username>
                        <label>First Name</label>
                        <input placeholder=Firstname>
                        <label>Last Name</label>
                        <input placeholder=Lastname>
                        <label>Email</label>
                        <input placeholder=Email>
                        <label>Password</label>
                        <input type='password' placeholder=Password>
                        <label>Confirm Password</label>
                        <input type='password' placeholder='Confirm Password'>
                    </div>
                    <div id="part2">
                        <div id="part2-prof">
                            <label>Profile Picture</label>
                            <img v-if="imageData.length > 0" :src="imageData">
                            <img v-else src="../assets/user.png">
                            <input @change="getSource" type=file>
                        </div>
                        <div id="part2-descr">
                            <label>Description about you</label>
                            <textarea rows=6 placeholder=Description> </textarea>
                        </div>
                    </div>
                </div>
                <input type=reset value=Submit>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "signup",
  props:["toggle"],
  data:function(){
      return {
          imageData:""
      }
  },
  methods:{
        getSource : function(event){
            const input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData= e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
            console.log(this.imageData);
        }
    }
};
</script>

<style>
#part2 img{
    width:200px;
    height: 200px;
    border-width:1px;
    border-radius:50%;
    outline-color: black;
    border:solid;
}
.blur-back{
    position:absolute;
    width:99%;
    height:99%;
    background-color: #d8dee8;
    opacity:80%;
    top:0;
    align-items:center;

    display:flex;
}

.form{
    background-color: white;
    border-radius:5px;
    padding:2%;
    opacity: 100;
    margin:auto;
    display:flex;
    justify-content:center;
    width:70%;
    flex-direction: column;
    max-width: 1000px;
}
#inputs{
    display:flex;
    flex-direction: row;
}
#part1,#part2{
    display:flex;
    flex-direction: column;
    width:50%;
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
#part2-descr{
    
}
#part1 label, #part2 label{
    padding-left:2%;
    font-family: "Quicksand", sans-serif;
}


</style>