<template>
    <div>
        <svg @click="humbergOn = !humbergOn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="3%" height="3%"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        <div v-if="humbergOn === true" class="menu">
            
        </div>
    </div>
</template>

<script>
export default {
    name : "humberg-menu",
    data : function() {
       return {
           humbergOn : false
       }
    }
};
</script>

<style scoped>
    svg{
        min-width: 32px;
        max-width:32px;
        padding-left:2%;
    }
</style>