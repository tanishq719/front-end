<template>
    <div class="content" ref='content'>
        {{refreshBody}}
        <h2  v-text="title" :style="{'margin':'3pt'}"></h2>
        <hr v-if="title.length !== 0">
        <br>
        <p v-html="body" >
          <!-- <img v-if="imageDatas" :src="> -->
        </p>
        <br>
        <hr>
        <div class="tags">
            Tags: 
            <ul>
                <li v-for="(name,index) in tagList" :key="index"><Tag @cancle-tag="tagList.splice(index,1)" :value="name" color="blue" customizable="true"/> </li>
            </ul>
        </div>
        <div class="tags">
            Group
            <ul>
                <li v-for="(name,index) in groupList" :key="index"><Tag @cancle-tag="groupList.splice(index,1)" :value="name" color="red" customizable="true"/> </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Tag from './Tag';
export default {
    name:"ContentView",
    components:{
        Tag
    },
    data:function(){
        return {
            body: '',
            title: '',
            tagList:['Java','Python','JS','Java','Python','JS'],
            groupList:['Javalane','TechZombies',"Elon's Group"]
        }
    },
    methods:{

    },
    computed:{
        ...mapGetters(['getBody','getTitle','getImageDatas']),
        refreshBody: function(){
            this.body = this.getBody;
            this.title = this.getTitle;
            var reg = /\$\$\d+\$\$/;
            var i = this.body.search(reg);
            while( i != -1)
            {
                var replaceAble = '<img src="'+this.getImageDatas[Number(this.body[i+2])]+'" class="contentImg" >';
                this.body = this.body.replace(reg,replaceAble);
                i = this.body.search(reg);
            }
            // this.$refs['content'].focus();
            // var height = await this.$refs['content'].scrollHeight;
            // window.scrollTo(0,height)

            if(this.$refs.content)
            {
                console.log(this.$refs['content'].scrollHeight)
                this.$refs.content.scrollTop = this.$refs['content'].scrollHeight;
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap');
.content{
    padding:5px;
    margin:5px 0 35pt 20pt;
    border-radius: 7px;
    border-style: solid;
    border-color: #0a234d;
    border-width: 2pt;
    font-family:'Montserrat', sans-serif;
    font-size:14pt;
    display:flex;
    flex-direction:column;
    height: 335px;
    /* margin-left: 20pt; */
    word-wrap: break-word;
    overflow-y: auto;
}
p{
    white-space: pre-wrap;
    overflow-wrap: break-word;
    word-break: break-all;
    margin: 0;
}
hr{
    border-color: black;
    border-width: 0.5pt;
    margin: 0;
}
</style>
<style>
.tags ul{
    list-style: none;
    padding: 0;
    margin: 2pt;
    display: block;
    margin: 5pt;
}
.tags li{
    float:left;
}
.contentImg{
    width:60%;
    height:20%;
    max-height: 400px;
    display: grid;
    margin: auto;
}
</style>
