<template>
    <div class="body">
        <!-- var editor = document.querySelector('textarea') -->
        <div id="prompt" v-if="link === true">
                <input v-model="extLink" placeholder="external link"/>
                <input v-model="linkName" placeholder="name to show"/>
                <button @click="makeLink()">OK</button>
        </div>
        {{refershBody}}
        <textarea v-model="body" 
        @keydown.exact="gate($event)"
        @keydown.ctrl.66.exact.prevent="makeBold(true)" 
        @keydown.ctrl.73.exact.prevent="makeItalic(true)"
        @keydown.ctrl.76.exact.prevent="styleLike({'target':{'name':'list'}})" 
        @keydown.enter.exact="listNewline($event)" ref="textarea" rows=20 cols=40 placeholder="Explain">
        </textarea>
        <div id="pallet">{{letters}}/750</div>
        <div style="display:flex; flex-direction:column-reverse;">
            <ul>
                <li><img @click="styleLike($event)" :style="[bold?style:{}]" name='bold' src="../assets/baseline_format_bold_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" :style="[italic?style:{}]" name='italic' src="../assets/baseline_format_italic_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" :style="[list?style:{}]" name='list' src="../assets/baseline_format_list_bulleted_black_18dp.png" width="25pt" height="25pt"></li>
                <li><label for="file-input"><img @click="image=!image" :style="[image?style:{}]" src="../assets/baseline_image_black_18dp.png" width="25pt" height="25pt"></label></li>
                <li><img @click="link=!link" :style="[link?style:{}]" name='link' src="../assets/baseline_link_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @mouseover="math=!math" :style="[math?style:{}]" name='math' src="../assets/baseline_functions_black_18dp.png" width="25pt" height="25pt"></li>
                <div @mouseover="math=true" @mouseleave="math=false" v-if="math === true" id="symbols">
                    <ul>
                        <li @click="insertSym($event)">&forall;</li>
                        <li @click="insertSym($event)">&part;</li>
                        <li @click="insertSym($event)">&exist;</li>
                        <li @click="insertSym($event)">&sum;</li>
                        <li @click="insertSym($event)">&prod;</li>
                        <li @click="insertSym($event)">&minus;</li>
                        <li @click="insertSym($event)">&#x2213;</li>
                        <li @click="insertSym($event)">&#x2215;</li>
                        <li @click="insertSym($event)">&lowast;</li>
                        <li @click="insertSym($event)">&#x2219;</li>
                        <li @click="insertSym($event)">&radic;</li>
                        <li @click="insertSym($event)">&#x221B;</li>
                        <li @click="insertSym($event)">&#x221C;</li>
                        <li @click="insertSym($event)">&prop;</li>
                        <li @click="insertSym($event)">&infin;</li>
                        <li @click="insertSym($event)">&ang;</li>
                        <li @click="insertSym($event)">&and;</li>
                        <li @click="insertSym($event)">&or;</li>
                        <li @click="insertSym($event)">&cap;</li>
                        <li @click="insertSym($event)">&cup;</li>
                        <li @click="insertSym($event)">&int;</li>
                        <li @click="insertSym($event)">&le;</li>
                        <li @click="insertSym($event)">&ge;</li>
                        <li @click="insertSym($event)">&sube;</li>
                        <li @click="insertSym($event)">&supe;</li>
                    </ul>
                </div>
                <input id="file-input" @change="getSource" name='image' type="file"/>
            </ul>
        </div>
    </div>
</template>

<script>
import { bus } from '../main';
import { mapMutations, mapGetters, mapActions} from 'vuex';
export default {
    name: "TextEditor",
    data : function(){
        return {
            body:'',
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
            },
            editor:"",
            elapse:false,
            extLink:"",
            linkName:"",
            letters:0
        }
    },
    methods:{
        ...mapMutations(['saveBody','saveImageFiles','saveImageDatas']),
        ...mapActions(['insertMessages']),
        gate:function(e){
            console.log(e);
            if(e.key !== "Backspace" && this.body.length >= 750)
            {
                e.preventDefault();
                this.insertMessages([{'type':'warning','note':'word limit exceeded !!!'}]);
            }
        },
        insertSym: function(e){
            var pos = this.editor.selectionStart;
            this.body = this.body.substring(0,pos) + e.target.innerHTML + this.body.substring(pos, this.body.length);
            this.editor.selectionEnd = this.editor.selectionStart = pos + 1;
        },
        makeBold: function(flag){
            if(flag){
                var start = this.editor.selectionStart;
                var end = this.editor.selectionEnd;
                if(start > end)
                {
                    var temp = start;
                    start = end;
                    end = start;
                }
                var p = new Promise((resolve,reject)=>{
                    this.body = this.body.substring(0,start) + '<b>' + this.body.substring(start,end) + '</b>' + this.body.substring(end,this.body.length);
                    resolve();
                });
                p.then(()=>{
                    this.editor.selectionEnd = this.editor.selectionStart = end + 7;
                    this.editor.focus();
                });     
            }
            else{
                var pos = this.editor.selectionStart;
                var p = new Promise((resolve,reject)=>{
                        this.body = this.body.substring(0,pos) + '<b></b>' + this.body.substring(pos, this.body.length);
                        resolve();
                    });

                p.then(()=>{
                        this.editor.selectionEnd = this.editor.selectionStart = pos + 3;
                        this.editor.focus();
                });
            }
        },
        makeItalic:function(flag){
            if(flag)
            {
                var start = this.editor.selectionStart;
                var end = this.editor.selectionEnd;
                if(start > end)
                {
                    var temp = start;
                    start = end;
                    end = start;
                }
                var p = new Promise((resolve,reject)=>{
                    this.body = this.body.substring(0,start) + '<i>' + this.body.substring(start,end) + '</i>' + this.body.substring(end,this.body.length);
                    resolve();
                });
                p.then(()=>{
                    this.editor.selectionEnd = this.editor.selectionStart = end + 7;
                    this.editor.focus();
                });
            }
            else{
                var pos = this.editor.selectionStart;
                var p = new Promise((resolve,reject)=>{
                        this.body = this.body.substring(0,pos) + '<i></i>' + this.body.substring(pos, this.body.length);
                        resolve();
                });

                p.then(()=>{
                        this.editor.selectionEnd = this.editor.selectionStart = pos + 3;
                        this.editor.focus();
                });
            }
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
                        this.body = this.body.substring(0,pos) + '<a href="'+this.extLink+'">'+this.linkName+'</a>' + this.body.substring(pos, this.body.length);
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
                    this.makeBold(false);
                else if(this.italic)
                {
                    this.editor.selectionStart = this.editor.selectionStart + 8;
                    this.makeItalic(false);
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
                    this.makeItalic(false);
                }
                else if(this.bold){
                    this.editor.selectionStart = this.editor.selectionStart + 8;
                    this.makeBold(false);
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
                    var pos = this.editor.selectionStart;
                    var p = new Promise((resolve,reject)=>{
                        this.body = this.body.substring(0,pos) + '\n$$'+(this.imageFiles.length-1)+'$$\n' + this.body.substring(pos, this.body.length);
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
                this.makeLink(false);
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
            const input = e.target;
            if (input.files && input.files[0]){
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
            this.letters = this.body.length;
            if(this.body.length > 750)
            {
                this.body = this.body.substring(0,750);
                this.insertMessages([{'type':'warning','note':'word limit exceeded !!!'}]);
            }
            this.saveBody(this.body);
        },
        imageFiles: function(){
            this.saveImageFiles(this.imageFiles);
        },
        imageDatas: function(){
            this.saveImageDatas(this.imageDatas);
        }
    },
    computed:{
        ...mapGetters(['getBody']),
        refershBody:function(){
            this.body = this.getBody;
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
#symbols{
    width:170pt;
    height:135pt;
    position:absolute;
    top:40%;
    left:100%;
    border-style:solid;
    border-width:2pt;
    border-color:#9fc6f8;
    border-radius:5pt;
    padding:5pt;
    transition: 1s;
}
#symbols ul li{
    display:inline-block;
    padding:5px;
    border-bottom-style:solid;
    border-color:#bdc0c4;
    border-width:2pt;
    border-radius:2pt;
    margin:2pt;
}
li:hover{
    color: #fde400;
}
#pallet{
    position: absolute;
    top: 100%;
    left: 83%;
    border-style: solid;
    border-width: 2pt;
    border-radius: 10pt;
    color:#ff8800;
}
</style>
