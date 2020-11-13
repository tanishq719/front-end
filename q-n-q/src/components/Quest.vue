<template>
    <div class='quest'>
        <div class="ask">
            <div>
                <label>Title</label>
                <input v-model="title" placeholder="">
            <div></div>
            </div>
            <label>Body</label>
            <TextEditor/>
            <button style="margin: auto;" @click="postQuestion">Post</button>
        </div>
        <div class="select">
            <label>Choose an appropriate Group</label>
            <input placeholder="Global Group will be choosen by default">
            <label>Choose appropriate Tags</label>
            <input placeholder="Search">
        </div>        
    </div>
</template>

<script> 
import { bus } from '../main'
import TextEditor from './TextEditor'
import { mapActions } from 'vuex'
export default {
    name:"Quest",
    components:{
        TextEditor
    },
    data: function(){
        return {
            title:"",
            group:"",
            tag:[]
        }
    },
    methods:{
        ...mapActions(['postThread']),
        postQuestion: function()
        {
            bus.$emit('post-called');
            this.$on('collect-body',(body)=>{
                postThread(this.data.title,body,this.data.group,this.data.tag)
            })
        }
    }
}
</script>

<style scoped>
.quest{
    width:100%;
    margin: 15% 0%;
    margin-top: 2%;
    display:flex;
    flex-direction: row;
    justify-content:space-evenly;
}
.ask{
    display:flex;
    flex-direction: column;
    position: relative;
    width:70%;
}
input{
    display: block;
    padding:3pt;
    margin:3pt 0;
    border-radius: 4pt;
    border-style: solid;
    border-color: #0a234d;
    border-width: 2pt;
    resize:none;
    width: calc(100% - 35pt) 
}
.select{
    width:25%;
}
button{
 padding: 0px 10px 0px 10px;
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
  font-size: 14pt;
  height:35pt;
}
</style>