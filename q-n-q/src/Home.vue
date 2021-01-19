<template>
  <div id="home">
    <MyHeader />
    <hr>
    <div id="bottom">
      <SideBarMenu />
      <router-view name="mainView"/>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/Header.vue'
import SideBarMenu from './components/SideBarMenu.vue'

export default {
  name: "home",
  components: {
    MyHeader,
    SideBarMenu
  },
  mounted(){
    this.$store.commit('initializeUserStore')
  }
};
</script>

<style>
html,body{
  height:100%;
}
#bottom{
  display:flex;
  height:100%
  /* flex-direction:row; */
}
hr{
  margin:0 10px;
}
#home{
  display:flex;
  flex-direction: column;
  height:100%;
  content: fit-content(100%);
  border:0px;
  padding:0px;
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
}
button:focus{
  outline:none;
}
input:focus{
  outline:none;
}
</style>
