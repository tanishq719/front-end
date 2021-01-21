<template>
  <div id="tag" :style="{'background-color':colors[color], 'border-color':colors[color]}">
      {{value}}
      <img v-if="customizable === 'true'" src="../assets/clear.png" 
            @click="$emit('cancle-tag')" 
            @mouseover="flag=true" 
            @mouseleave="flag=false"
            :style="[flag?new_style:old_style]">
  </div>
</template>

<script>
export default {
    name:"Tag",
    props:{
        value:String,
        color:String,
        customizable:String
    },
    data: function(){
        return {
            new_style:{
                'width':'12pt',
                'height':'12pt'
            },
            old_style:{
                'width':'10pt',
                'height':'10pt'
            },
            flag:false,
            colors:{
                'blue':'#0094bd',
                'red':'#db5537',
                'orange': '#f2771f',
                'yellow': '#ebcc1c',
                'green': '#23a31a'
            }
        }
    }
}
</script>

<style scoped>
/* @media (prefers-color-scheme : dark){ */
    #tag{
    opacity: 80%;
    margin:2pt;
    border: solid;
    border-width: 2pt;
    border-radius: 25%;
    width: fit-content;
    text-align: left;
    border-radius:5pt;
    font-size: 10pt;
    display: flex;
    justify-content: center;
    padding:1pt;
    filter: drop-shadow(1px 2px 4px grey);
}
img{
    width: 10pt;
    height: 10pt;
    float: right;
    padding-left:5pt;
    margin:auto;
}
/* } */
</style>