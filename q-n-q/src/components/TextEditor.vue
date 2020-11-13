<template>
    <div class="body">
        <div class="texteditor">
            <p :style="{'margin':0}" contenteditable=true :html="body" placeholder="Explain">
                <b>askjd</b>
            </p>
        </div>
        <div style="display:flex; flex-direction:column-reverse;">
            <ul>
                <li><img @click="styleLike($event)" name='bold' src="../assets/baseline_format_bold_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" name='italic' src="../assets/baseline_format_italic_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" name='list' src="../assets/baseline_format_list_bulleted_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" name='image' src="../assets/baseline_image_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" name='link' src="../assets/baseline_link_black_18dp.png" width="25pt" height="25pt"></li>
                <li @click="styleLike($event)" name='math' style="font-size:20px; padding:0pt 8pt;">&#8721;</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { bus } from '../main'
export default {
    name: "TextEditor",
    data : function(){
        return {
            content:"hello",
            body:"<b>Hello</b>",
            bold: false,
            italic: false,
            list: false,
            link: false
        }
    },
    methods:{
        styleLike: function(e){
            if(e.target.name === 'bold'){
                this.bold = !this.bold;
            }
        }
    },
    created(){
        bus.$on('post-called',()=>this.$emit('collect-body',this.data.body))
    },
    watch:{
        bold:function(){
            if(this.bold)
            {
                
            }
        },
        // body:function(){
        //     if(this.bold){
        //         var appendStr = this.body[this.body.length-1].bold()
        //         this.body.slice(0,this.body.length-1);
        //         this.body += appendStr;
        //         console.log(this.body);
        //     }
                
        // }
    }
}
</script>

<style>
.body{
    display: flex;
    flex-direction: row;
    position: relative;
    margin:0%;
}
ul{
    list-style:none;
    /* margin:2pt; */
    padding:0;
}
li{
    padding:0pt 3pt;
}
.texteditor{
    padding:5px;
    margin:5px 0;
    border-radius: 7px;
    border-style: solid;
    border-color: #0a234d;
    border-width: 2pt;
    resize:none;
    width:100%;
    height: 300pt;
}
</style>