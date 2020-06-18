<template>
  <div id="home">
    <Header />
    <hr>
    <HumbergMenu />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import HumbergMenu from './components/HumbergMenu.vue'
export default {
  name: "home",
  components: {
    Header,
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
