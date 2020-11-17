<template>
    <div class="body">
        <textarea v-model="body" @keydown.enter="listNewline" ref="textarea" rows=20 cols=40 placeholder="Explain">
        </textarea>
        <div style="display:flex; flex-direction:column-reverse;">
            <ul>
                <li><img @click="styleLike($event)" :style="[bold?style:{}]" name='bold' src="../assets/baseline_format_bold_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" :style="[italic?style:{}]" name='italic' src="../assets/baseline_format_italic_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" :style="[list?style:{}]" name='list' src="../assets/baseline_format_list_bulleted_black_18dp.png" width="25pt" height="25pt"></li>
                <li><label for="file-input"><img @click="styleLike($event)" :style="[image?style:{}]" name='image' src="../assets/baseline_image_black_18dp.png" width="25pt" height="25pt"></label></li>
                <li><img @click="styleLike($event)" :style="[link?style:{}]" name='link' src="../assets/baseline_link_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" :style="[math?style:{}]" name='math' src="../assets/baseline_functions_black_18dp.png" width="25pt" height="25pt"></li>
                <input id="file-input" @change="getSource" type="file"/>
            </ul>
        </div>
    </div>
</template>

<script>
import { bus } from '../main';
import {mapMutations} from 'vuex';
export default {
    name: "TextEditor",
    data : function(){
        return {
            body:"Hello",
            bold: false,
            italic: false,
            list: false,
            image: false,
            link: false,
            math: false,
            imageFiles:[],
            imageDatas:[],
            style:{
                'background-color':'#f0af2e',
                'border-radius':'50%',
                'padding':'2pt'
            }
        }
    },
    methods:{
        ...mapMutations(['saveBody','saveImageFiles','saveImageDatas']),

        styleLike: function(e){
            var editor = this.$refs['textarea'];
            var pos = editor.selectionStart;
            if(e.target.name === 'bold'){
                this.bold = !this.bold;

                if(this.bold){
                    var p = new Promise((resolve,reject)=>{
                        this.body = this.body.substr(0,pos) + '<b></b>' + this.body.substr(pos, this.body.length-1); 
                        console.log(this.body);
                        resolve();
                    });

                    p.then(()=>{
                        editor.selectionEnd = editor.selectionStart = pos + 3;
                        editor.focus();
                    }) 
                }

                else{
                        if(this.italic)
                        {
                            var p = new Promise((resolve,reject)=>{
                                this.body += '<i></i>'
                                resolve();
                            });

                            p.then(()=>{
                                editor.selectionEnd = editor.selectionStart = this.body.length - 4;
                                editor.focus();
                            })
                        }
                        else{
                            editor.selectionEnd = editor.selectionStart = this.body.length;
                            editor.focus();
                        }
                }
            }
            else if(e.target.name === 'italic')
            {
                this.italic = !this.italic;

                if(this.italic){
                    var p = new Promise((resolve,reject)=>{
                        this.body = this.body.substr(0,pos) + '<i></i>' + this.body.substr(pos, this.body.length-1); 
                        console.log(this.body);
                        resolve();
                    });

                    p.then(()=>{
                        editor.selectionEnd = editor.selectionStart = pos + 3;
                        editor.focus();
                    })
                }
                else{
                        if(this.bold)
                        {
                            var p = new Promise((resolve,reject)=>{
                                this.body += '<b></b>'
                                resolve();
                            });

                            p.then(()=>{
                                editor.selectionEnd = editor.selectionStart = this.body.length - 4;
                                editor.focus();
                            })
                        }
                        else{
                            editor.selectionEnd = editor.selectionStart = this.body.length;
                            editor.focus();
                        }
                }
            }

            else if(e.target.name === 'list'){
                this.list = !this.list;
                if(this.list)
                {
                    this.body += '\n  &bull;\t';
                    editor.focus();
                }
                else{
                    this.body += '\n';
                    editor.focus();
                }
            }

            else if(e.target.name === 'image')
            {
                this.image = !this.image;
                if(this.image)
                {
                    var p = new Promise((resolve,reject)=>{
                        this.body = this.body.substr(0,pos) + '\n$$'+this.imageFiles.length+'$$\n' + this.body.substr(pos, this.body.length-1); 
                        console.log(this.body);
                        resolve();
                    });

                    p.then(()=>{
                        editor.selectionEnd = editor.selectionStart = pos + 8 + this.imageFiles.length.toString().length;
                        editor.focus();
                    })
                }
            }
        },

        listNewline: function(e){
            if(this.list)
            {
                e.preventDefault();
                this.body += '\n  &bull;\t';
            }
        },

        getSource: function(e){
            console.log("getSourde get called");
            const input = e.target;
            this.imageFiles.push(input.files[this.imageFiles.length - 1]);
            if (input.files && input.files[this.imageFiles.length - 1]){
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageDatas.push(e.target.result);
                }
                reader.readAsDataURL(input.files[this.imageFiles.length - 1]);
            }
            this.image = !this.image;
        }
    },
    created(){
        bus.$on('post-called',()=>this.$emit('collect-body',this.body))
    },
    watch:{
        body:function(){
            this.saveBody(this.body);
        },
        title:function(){

        },
        imageFiles: function(){
            this.saveImageFiles(this.imageFiles);
        },
        imageDatas: function(){
            this.saveImageDatas(this.imageDatas);
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@1,300&display=swap');
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
textarea{
    padding:5px;
    margin:5px 0;
    border-radius: 7px;
    border-style: solid;
    border-color: #0a234d;
    border-width: 2pt;
    resize:none;
    width:100%;
    font-family:'Inria Serif', serif;
    font-size:10pt;
}
#file-input{
   display: none;
}
</style>
