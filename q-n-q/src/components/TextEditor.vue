<template>
    <div class="body">
        <!-- var editor = document.querySelector('textarea') -->
        <div id="prompt" v-if="link === true">
                <input v-model="extLink" placeholder="external link"/>
                <input v-model="linkName" placeholder="name to show"/>
                <button @click="makeLink()">OK</button>
        </div>
        {{refershBody}}
        
        <textarea contenteditable=true v-model="body" 
        @keydown.exact="gate($event)"
        @keydown.ctrl.66.exact.prevent="makeFontStyleBI('b')" 
        @keydown.ctrl.73.exact.prevent="makeFontStyleBI('i')"
        @keydown.ctrl.76.exact.prevent="styleLike({'target':{'name':'list'}})" 
        @keydown.enter.exact="listNewline($event)" ref="textarea" rows=20 cols=40 placeholder="Explain">
        <b contenteditable=false>Hello World</b>
        </textarea>
        <div id="pallet">{{body.length}}/750</div>
        <div style="display:flex; flex-direction:column-reverse;">
            <ul>
                <li><img @click="styleLike($event)" :style="[bold?style:{}]" name='bold' src="../assets/baseline_format_bold_black_18dp.png" width="25pt" height="25pt"></li>
                <li><img @click="styleLike($event)" :style="[italic?style:{}]" name='italic' src="../assets/baseline_format_italic_black_18dp.png" width="25pt" height="25pt"></li>
                
                <li><img :style="[list?style:{}]" name='list' src="../assets/baseline_format_list_bulleted_black_18dp.png" width="25pt" height="25pt"></li>
                <li><label for="file-input"><img @click="image=!image" :style="[image?style:{}]" src="../assets/baseline_image_black_18dp.png" width="25pt" height="25pt"></label></li>
                
                <li><img @click="link=!link" :style="[link?style:{}]" name='link' src="../assets/baseline_link_black_18dp.png" width="25pt" height="25pt"></li>
                <li @mouseover="math=true" @mouseleave="math=false"><img :style="[math?style:{}]" name='math' src="../assets/baseline_functions_black_18dp.png" width="25pt" height="25pt">
                    <div  v-if="math === true" id="symbols">
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
                </li>
                <input id="file-input" @change="getSource" name='image' type="file"/>
            </ul>
        </div>
    </div>
</template>

<script>
import { bus } from '../main';
import { mapMutations, mapGetters, mapActions} from 'vuex';
import { Heap } from 'collections/heap';
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
            linkName:""
        }
    },
    methods:{
        ...mapMutations(['saveBody','saveImageFiles','saveImageDatas']),
        ...mapActions(['insertMessages']),
        gate:function(e){
            if(this.body.length >= 750 && (e.key !== "Backspace" && e.key !== "Delete"))
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
        makeFontStyleBI: async function(style){
            let start = this.editor.selectionStart;
            let end = this.editor.selectionEnd;
            let first,last;
            if(style === 'b'){
                first = '<b>';
                last = '</b>';
            }
            else{
                first = '<i>';
                last = '</i>';
            }
            var text = this.body.substring(start,end);
            // case 1: between bold make unbold word and then partially bold it with already bold one
            //          in this case span of style unbold wont work
            // case 2: if selected text is already bold but the tag which is keeping is bold is that
            //          far that in between many bold tags are there then how to detect equal number of bold unboald
            //          therefore regex must be greedy not lazy
    
            // (?x)    # enable regex comment mode
            // ^       # match start of line/string
            // (?:     # begin non-capturing group
            //   (?!   # begin negative lookahead
            //     ab  # literal text sequence ab
            //   )     # end negative lookahead
            //   [^]     # any character including line change
            // )       # end non-capturing group
            // +       # repeat previous match one or more times
            // $       # match end of line/string

            // case 1: when selected string contains text only
            //          in such case we need to check left and right side,
            //              such condition wont come when closing is more in number but all before opening(regex is filtering this)
            //              if at left opening tags are greater then text needs to be unbold
            //              if at left closing tags are greater or equal to opening then text must be bolded
            //          at right side:  therefore there is no role of right side here
            //              no role of opening tags
            //              if closing tags are equal to or greater than left side opening tags then unbold
            //              if closing tags are less than left side opening tags then also unbold
            // case 2: when selected string contains opening tag
            //          if at left side opening tags are more then unblod the text
            //              but how, the closing tags at left must be equal to opening tags, 
            //              and opening tags must be equal to closing tags in right
            //              also string now should not contain any opening tag
            //          else bold the text
            // case 3: when selected string contains closing tag
            //          if no of unbalanced opening tags at left is more then the closing tags in selected string
            //              then unbold the string and also remove any tag from the selected string
            //              at left side no of closing tags must be equal to extra opening tags, and at left opening tags
            //              must be equal to no of extra closing tags
            //          else bold the string

            //<b>(?:(?!<\/b>)[^])*"+text+"(?:(?!<b>)[^])*<\/b>      // this was ristricting the search and we need greedy search
            let mask = new RegExp(first+"[^]*"+text+"[^]*"+last,"g");
            let results = this.body.matchAll(mask);

            if(start != end){
                if(start > end)
                {
                    [start, end] = [end, start]
                }
                // if 'matches' contain anything that means 'text' can be already in bold thus job is to unbold if so
                // else bold the text
                let matches = [...results];
                if(matches.length === 0)
                    doStyleAcc(this,1,1);
                else{
                    matches.every(match=>{
                    // console.log(match);
                    async function callback(_this){
                        if(match.index <= start && match.index + match[0].length >= end)
                        {
                            let parts = [];
                            parts.push(match[0].substring(0,start-match.index));
                            parts.push(match[0].substring(end-match.index,match[0].length));
                            let tagInStringMask = new RegExp(first+"|"+last,"g");
                            let flag = false;   // if false than unbold text
                            let limit=0;    // checking whether opening ancd closing bold tags are in balance
                            // for(let i=0; i<parts.length;i++)
                            // {
                            // checking left part
                            let temp = null;
                            // console.log(parts[0]);
                            
                            temp = parts[0].match(new RegExp(tagInStringMask,"g"));
                            let openingT = temp.reduce((counter,obj)=>{
                                if(obj === first)
                                    counter++;
                                return counter;
                            },0)

                            let closingT = temp.length - openingT;

                            // console.log(openingT,closingT);

                            let result = undefined;
                            result = text.match(tagInStringMask);

                            //case 1
                            if(!result || result.length === 0)
                            {
                                // opening tags are greater
                                if(openingT > closingT)
                                {
                                    [first, last] = [last, first];
                                    doStyleAcc(_this,openingT-closingT,openingT-closingT); //unbold
                                }
                                else{
                                    doStyleAcc(_this,1,1);  //bold
                                }
                            }
                            else{
                                let openingTtext = result.reduce((counter,obj)=>{
                                    if(obj === first)
                                        counter++;
                                    return counter;
                                },0)

                                let closingTtext = result.length - openingTtext;

                                //case 2 when opening tags in 'text' is more
                                if(openingTtext > closingTtext){
                                    if(openingT > closingT){
                                        [first, last] = [last, first];
                                        //sanitize
                                        text = text.replace(first,"");
                                        text = text.replace(last,"");
                                        //                                 extra openings of inner + left side
                                        doStyleAcc(_this,openingT-closingT,openingTtext-closingTtext + openingT-closingT); //unbold
                                    }
                                    else{
                                        doStyleAcc(_this,1,1);  //bold
                                    }
                                }
                                // case 3 when closing tags in 'text' is more
                                else if(closingTtext > openingTtext){
                                    if(openingT - closingT > closingTtext){ // if unbalanced opening tags of left more than inner closing ones
                                        [first, last] = [last, first];
                                        //sanitize
                                        text = text.replace(first,"");
                                        text = text.replace(last,"");
                                        //               extra closings of inner + left side openings
                                        doStyleAcc(_this,openingT-closingT + closingTtext - openingTtext,openingT-closingT); //unbold
                                    }
                                    else{
                                        doStyleAcc(_this,1,1);  //bold
                                    }
                                }
                                else{
                                    if(openingT > closingT)
                                    {
                                        [first, last] = [last, first];
                                        //sanitize
                                        text = text.replace(first,"");
                                        text = text.replace(last,"");
                                        doStyleAcc(_this,openingT-closingT,openingT-closingT); //unbold
                                    }
                                    else{
                                        //sanitize
                                        text = text.replace(first,"");
                                        text = text.replace(last,"");
                                        doStyleAcc(_this,1,1);  //bold
                                    }
                                }
                            }
                        }     
                    }
                    return callback(this);
                });}
                
            async function doStyleAcc(_this,n,m){
                let pre = "",post="";
                for(let i=0; i<n; i++)
                    pre += first
                for(let j=0; j<m; j++)
                    post += last

                _this.body = await _this.body.substring(0,start) + pre + text + post + _this.body.substring(end,_this.body.length);
                _this.editor.selectionEnd = _this.editor.selectionStart = await end + 7;
                await _this.editor.focus();
            }
            }
            else{
                var pos = this.editor.selectionStart;
                var p = new Promise((resolve,reject)=>{
                        this.body = this.body.substring(0,pos) + first + last + this.body.substring(pos, this.body.length);
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
                    // console.log(this.editor.selectionStart);
                        return new Promise((resolve,reject)=>{
                        this.makeFontStyleBI('b');
                        resolve();})
                })
                .then(()=>{
                        this.makeFontStyleBI('i');
                    })
            }
            else if(this.italic)
            {
                new Promise((resolve, reject)=>{
                    this.editor.selectionStart = this.editor.selectionStart + 14;
                    resolve();
                })
                .then(()=>{
                    this.makeFontStyleBI('i');
                })
            }
            else if(this.bold)
            {
                new Promise((resolve, reject)=>{
                    this.editor.selectionStart = this.editor.selectionStart + 14;
                    resolve();
                })
                .then(()=>{
                    this.makeFontStyleBI('b');
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
                    // console.log(this.editor.selectionStart);
                        return new Promise((resolve,reject)=>{
                        this.makeFontStyleBI('b');
                        resolve();})
                })
                .then(()=>{
                        this.makeFontStyleBI('i');
                    })
            }
            else if(this.italic)
            {
                new Promise((resolve, reject)=>{
                    this.editor.selectionStart = this.editor.selectionStart + 5;
                    resolve();
                })
                .then(()=>{
                    this.makeFontStyleBI('i');
                })
            }
            else if(this.bold)
            {
                new Promise((resolve, reject)=>{
                    this.editor.selectionStart = this.editor.selectionStart + 5;
                    resolve();
                })
                .then(()=>{
                    this.makeFontStyleBI('b');
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
                    this.makeFontStyleBI('b');
                else if(this.italic)
                {
                    this.editor.selectionStart = this.editor.selectionStart + 8;
                    this.makeFontStyleBI('i');
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
                    this.makeFontStyleBI('i');
                }
                else if(this.bold){
                    this.editor.selectionStart = this.editor.selectionStart + 8;
                    this.makeFontStyleBI('b');
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
            // for second enter
            if(this.elapse)
            {
                e.preventDefault();
                this.list = false;
                this.takeList();
                this.elapse = false;
            }
            // for first enter
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

        initialize: async function(){
            this.editor = await this.$refs['textarea'];
            this.editor.focus();
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
            // this.letters = this.body.length;
            // if(this.body.length > 750)
            // {
            //     this.body = this.body.substring(0,750);
            //     this.insertMessages([{'type':'warning','note':'word limit exceeded !!!'}]);
            // }
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
        refershBody: function(){
            this.body = this.getBody;
            // await this.editor.focus();
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
    background-color: #bdc0c4;
    opacity: 90%;
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
#symbols ul li:hover{
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
