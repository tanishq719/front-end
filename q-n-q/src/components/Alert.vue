<template>
  <div class="box">
    <ul>
      <li v-for="m in getMessages" :key="m.note" :class="m.type" class="notification">
        {{m.note}} 
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name:'alert',
    computed: mapGetters(['getMessages'])
}
</script>

<style scoped>
.box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  position:absolute;
  top:0;
  left:auto;
  width:100%;
  padding-top:2%;
}
ul{
  margin:auto;
  padding-left:0;
}
.notification{
  list-style-type: none;
  align-self: center;
  margin-bottom:10%;
  width:100%;
  padding:5%;
  /* border:1px solid rgb(15, 15, 15); */
  background-color: rgb(255, 255, 255);
  border-radius:5px;
  text-align: center;
  font-family: "Quicksand", sans-serif;
}
.error{
  border:1px solid rgb(235, 11, 11);
  color: rgb(185, 29, 29);
}
.success{
  border:1px solid rgb(1, 158, 40);
  color:rgb(7, 110, 33)
}
</style>