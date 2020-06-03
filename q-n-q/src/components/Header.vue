<template>
    <div class="logo-section">
        <img id="logo" src="../assets/logo.png">
        <img id = "full-form" src="../assets/full-form.png">
    </div>
</template>

<script>
export default {
    name: "header"
};
</script>

<style scoped>
    #logo{
        width:20%;
        max-width:100px;
    }
    #full-form{
        width:40%;
        max-width:200px;
    }
    .logo-section{
        display:flex;
        align-items: center;
        flex-direction:column;
        padding-left: 2%;
    }
</style>