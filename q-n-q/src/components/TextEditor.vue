<template>
    <div class="body">
        <!-- var editor = document.querySelector('textarea') -->
        <div id="prompt" v-if="link === true">
                <input v-model="extLink" placeholder="external link"/>
                <input v-model="linkName" placeholder="name to show"/>
                <button @click="makeLink()">OK</button>
        </div>
        <textarea v-model="body" @keydown.enter="listNewline($event)" ref="textarea" rows=20 cols=40 placeholder="Explain" @load="initialize()">
        </textarea>
        <div style="display:flex; flex-direction:column-reverse;">
            <ul>
                <li><img @click="styleLike($event)" :style="[bold?style:{}]" name='bold' src="../assets/baseline_format_bold_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" :style="[italic?style:{}]" name='italic' src="../assets/baseline_format_italic_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" :style="[list?style:{}]" name='list' src="../assets/baseline_format_list_bulleted_black_18dp.png" width="25pt" height="25pt"></li>
                <li><label for="file-input"><img @click="image=!image" :style="[image?style:{}]" src="../assets/baseline_image_black_18dp.png" width="25pt" height="25pt"></label></li>
                <li><img @click="link=!link" :style="[link?style:{}]" name='link' src="../assets/baseline_link_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" :style="[math?style:{}]" name='math' src="../assets/baseline_functions_black_18dp.png" width="25pt" height="25pt"></li>
                <input id="file-input" @change="getSource" name='image' type="file"/>
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
            link: true,
            math: false,
            imageFiles:[],
            imageDatas:[],
            style:{
                'background-color':'#f0af2e',
                'border-radius':'50%',
                'padding':'2pt'
            },
            editor:"",
            elapse:false,
            extLink:"",
            linkName:""
        }
    },
    methods:{
        ...mapMutations(['saveBody','saveImageFiles','saveImageDatas']),
        makeBold: function(){
            var pos = this.editor.selectionStart;
            var p = new Promise((resolve,reject)=>{
                        this.body = this.body.substr(0,pos) + '<b></b>' + this.body.substr(pos, this.body.length-1);
                        console.log(this.body);
                        resolve();
                    });

            p.then(()=>{
                        this.editor.selectionEnd = this.editor.selectionStart = pos + 3;
                        this.editor.focus();
            });
        },
        makeItalic:function(){
            var pos = this.editor.selectionStart;
            var p = new Promise((resolve,reject)=>{
                        this.body = this.body.substr(0,pos) + '<i></i>' + this.body.substr(pos, this.body.length-1);
                        console.log(this.body);
                        resolve();
                    });

            p.then(()=>{
                        this.editor.selectionEnd = this.editor.selectionStart = pos + 3;
                        this.editor.focus();
            });
        },
        makeList: function(){
            this.body += '\n  &bull;\t';
                    if(this.bold && this.italic)
                    {
                        new Promise((resolve, reject)=>{
                            this.editor.selectionStart = this.editor.selectionStart + 18;
                            resolve();
                        })
                        .then(()=>{
                            console.log(this.editor.selectionStart);
                             return new Promise((resolve,reject)=>{
                                this.makeBold();
                                resolve();})
                        })
                        .then(()=>{
                                this.makeItalic();
                            })
                    }
                    else if(this.italic)
                    {
                        new Promise((resolve, reject)=>{
                            this.editor.selectionStart = this.editor.selectionStart + 14;
                            resolve();
                        })
                        .then(()=>{
                            this.makeItalic();
                        })
                    }
                    else if(this.bold)
                    {
                        new Promise((resolve, reject)=>{
                            this.editor.selectionStart = this.editor.selectionStart + 14;
                            resolve();
                        })
                        .then(()=>{
                            this.makeBold();
                        })
                    }
                    else{
                        this.editor.selectionStart = this.editor.selectionStart + 10;
                        this.editor.focus();
                    }
        },
        takeList: function(){
            this.body += '\n';
            if(this.bold && this.italic)
            {
                new Promise((resolve, reject)=>{
                    this.editor.selectionStart = this.editor.selectionStart + 9;
                    resolve();
                })
                .then(()=>{
                    console.log(this.editor.selectionStart);
                        return new Promise((resolve,reject)=>{
                        this.makeBold();
                        resolve();})
                })
                .then(()=>{
                        this.makeItalic();
                    })
            }
            else if(this.italic)
            {
                new Promise((resolve, reject)=>{
                    this.editor.selectionStart = this.editor.selectionStart + 5;
                    resolve();
                })
                .then(()=>{
                    this.makeItalic();
                })
            }
            else if(this.bold)
            {
                new Promise((resolve, reject)=>{
                    this.editor.selectionStart = this.editor.selectionStart + 5;
                    resolve();
                })
                .then(()=>{
                    this.makeBold();
                })
            }
            else{
                this.editor.selectionStart = this.editor.selectionStart + 1;
                this.editor.focus();
            }

        },
        makeLink: function(){
            this.link = !this.link;
            var pos = this.editor.selectionStart;
            var p = new Promise((resolve,reject)=>{
                        this.body = this.body.substr(0,pos) + '<a href="'+this.extLink+'">'+this.linkName+'</a>' + this.body.substr(pos, this.body.length-1);
                        console.log(this.body);
                        resolve();
                    });

            p.then(()=>{
                        this.editor.selectionEnd = this.editor.selectionStart = pos + this.extLink.length + this.linkName.length + 15;
                        this.editor.focus();
            });
        },
        styleLike: function(e){
          
            if(e.target.name === 'bold'){
                this.bold = !this.bold;

                if(this.bold)   
                    this.makeBold();
                else if(this.italic)
                {
                    this.editor.selectionStart = this.editor.selectionStart + 8;
                    this.makeItalic();
                }
                else{
                    this.editor.selectionStart = this.editor.selectionStart + 4;
                    this.editor.focus();
                }
            }
            else if(e.target.name === 'italic')
            {
                this.italic = !this.italic;

                if(this.italic){
                    this.makeItalic();
                }
                else if(this.bold){
                    this.editor.selectionStart = this.editor.selectionStart + 8;
                    this.makeBold();
                }
                else{
                    this.editor.selectionStart = this.editor.selectionStart + 4;
                    this.editor.focus();
                }
            }

            else if(e.target.name === 'list'){
                this.list = !this.list;
                if(this.list)
                    this.makeList();
                else
                    this.takeList();
            }
            else if(e.target.name === 'image')
            {
                if(this.image)
                {
                    var p = new Promise((resolve,reject)=>{
                        this.body = this.body.substr(0,pos) + '\n$$'+(this.imageFiles.length-1)+'$$\n' + this.body.substr(pos, this.body.length-1);
                        console.log(this.body);
                        resolve();
                    });

                    p.then(()=>{
                        this.editor.selectionStart = pos + 8 + this.imageFiles.length.toString().length;
                        this.editor.focus();
                    })
                }
            }
            else if(e.target.name === 'link')
            {
                this.link = !this.link;
                this.makeLink();
            }
        },

        listNewline: function(e){
            if(this.elapse)
            {
                e.preventDefault();
                this.list = false;
                this.takeList();
                this.elapse = false;
            }
            if(this.list)
            {
                e.preventDefault();
                this.elapse = true;
                setTimeout(()=>{
                    if(this.list)
                        this.makeList();
                    this.elapse = false;
                },300);
            }
        },

        getSource: function(e){
            console.log("getSourde get called");
            console.log(e);
            const input = e.target;
            if (input.files && input.files[0]){
                console.log('input file is being read');
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageDatas.push(e.target.result);
                };
                for(var j=0; j<input.files.length; j++)
                {
                    this.imageFiles.push(input.files[j]);
                    reader.readAsDataURL(input.files[j]);
                }
                this.styleLike(e);
            }
            this.image = !this.image;
        },

        initialize: function(){
            this.editor = this.$refs['textarea'];
        }
    },
    mounted(){
        this.initialize();
    },
    created(){
        // bus.$on('post-called',()=>this.$emit('collect-body',this.body))
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
#prompt{
    position: absolute;
    display: flex;
    flex-direction: column;
    margin:2pt;
    left: 27%;
    border-style: solid;
    border-color: black;
    border-width: 2pt;
    border-radius: 5pt;
    top: 5pt;
}
#prompt input
{
    margin: 2pt 5pt;
    border-width: 2pt;
    border-style: solid;
    border-color: black;
    border-radius: 5pt;
    width: 150pt;
    padding: 2pt;

}
#prompt button
{
    padding: 0px 5px 0px 5px;
  background-color: #bdc0c4;
  color: red;
  border-width: 2px;
  border-radius: 5px;
  border-color:  #bdc0c4;
  width: 100%;
  max-width: 120px;
  border-style: solid;
  text-align: center;
  font-family: "Quicksand", sans-serif;
  font-size: 14pt;
  height: 25pt;
  margin: 5pt auto;
}
</style>
