<template>
  <div id="home">
    <Header />
    <hr>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: "home",
  components: {
    Header
  }
};
</script>

<style>
hr{
  height:1px;
  background-color:rgb(102, 85, 85);
  border:none;
}
</style>
