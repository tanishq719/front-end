<template>
  <div id="home">
    <MyHeader />
    <hr>
    <HumbergMenu />
  </div>
</template>

<script>
import MyHeader from './components/Header.vue'
import HumbergMenu from './components/HumbergMenu.vue'
export default {
  name: "home",
  components: {
    MyHeader,
    HumbergMenu
  }
};
</script>

<style>
hr{
  height:1px;
  background-color:rgb(102, 85, 85);
  border:none;
}
button:focus{
  outline:none;
}
input:focus{
  outline:none;
}
</style>
