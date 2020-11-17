<template>
  <div class="content" >
      <p v-html="body"></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name:"ContentView",
    data:function(){
        return {
            body: '',
            imageDatas: ''
        }
    },
    methods:{
        
    },
    computed:{
        ...mapGetters(['getBody','getImageDatas']),
        refreshBody(){
            this.body = getBody();
            var reg = /\$\$\d+\$\$/;
            var i=0;
            while(content.search(reg) != -1)
            {
                var replaceAble = '<img :src="imageDatas['+i+']">';
                this.body.replace(reg,replaceAble);
                i++;
            }
            // this.body = content;
            this.imageDatas = getImagesDatas();
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
    height: 65%;
    margin-left: 20pt;
    word-wrap: break-word;
}
p{
    white-space: pre-wrap;
    overflow-wrap: break-word;
    word-break: break-all;
    margin: 0;
}
</style>