<template>
    <div class='quest'>
        <div class="ask">
            <div>
                <label>Title</label>
                <input v-model="title" placeholder="">
            <!-- <div class="body"> -->
                <!-- <div> -->
                <label>Body</label><br/>
                <textarea v-model="body" rows=20 cols=80 placeholder="Explain">
                </textarea>
                <!-- </div> -->
                
            <!-- </div> -->
            </div>
            <div style="display:flex; flex-direction:column-reverse;">
                <ul>
                    <li><img src="../assets/baseline_format_bold_black_18dp.png" width="25vh" height="25vh"></li>
                    <li><img src="../assets/baseline_format_italic_black_18dp.png" width="25vh" height="25vh"></li>
                    <li><img src="../assets/baseline_format_list_bulleted_black_18dp.png" width="25vh" height="25vh"></li>
                    <li><img src="../assets/baseline_image_black_18dp.png" width="25vh" height="25vh"></li>
                    <li><img src="../assets/baseline_link_black_18dp.png" width="25vh" height="25vh"></li>
                    <li style="font-size:20px; padding:0 5px;">&#8721;</li>
                </ul>
            </div>
            
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
export default {
    name:"Quest",
    data: function(){
        return {
            title:"",
            body:""
        }
    }
}
</script>

<style scoped>
.quest{
    width:100%;
    margin: 2% 10%;
    display:flex;
    flex-direction: row;
    justify-content: center;
}
ul{
    list-style:none;
    margin:0%;
    padding:2vh 0vh;
}
.ask{
    display:flex;
}
.body{
    display: flex;
    flex-direction: row;
}
input, textarea{
    display: block;
    padding:5px;
    margin:5px 0;
    border-radius: 7px;
    border-style: solid;
    border-color: #0a234d;
    border-width: 2%;
    resize:none;
    width:97%;
}
</style>