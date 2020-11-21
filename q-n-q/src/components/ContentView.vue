<template>
  <div class="content" >
  {{refreshBody}}
      <p v-html="body">
          <!-- <img v-if="imageDatas" :src="> -->
      </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name:"ContentView",
    data:function(){
        return {
            body: ''
        }
    },
    methods:{

    },
    computed:{
        ...mapGetters(['getBody','getImageDatas']),
        refreshBody: function(){
          console.log('from computed of contentView');
            this.body = this.getBody;
            var reg = /\$\$\d+\$\$/;
            var i = this.body.search(reg);
            while( i != -1)
            {
                console.log(i);
                console.log(this.body[i+2])
                var replaceAble = '<img src="'+this.getImageDatas[Number(this.body[i+2])]+'" class="contentImg" >';
                console.log(replaceAble);
                this.body = this.body.replace(reg,replaceAble);
                console.log(this.body);
                i = this.body.search(reg);
                console.log(i);
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap');
.content{
    padding:5px;
    margin:5px 0;
    border-radius: 7px;
    border-style: solid;
    border-color: #0a234d;
    border-width: 2pt;
    font-family:'Montserrat', sans-serif;
    font-size:14pt;
    height: 335px;
    margin-left: 20pt;
    word-wrap: break-word;
    overflow-y: auto;
}
p{
    white-space: pre-wrap;
    overflow-wrap: break-word;
    word-break: break-all;
    margin: 0;
}
</style>
<style>
.contentImg{
    width:60%;
    height:20%;
    max-height: 400px;
    display: grid;
    margin: auto;
}
</style>
