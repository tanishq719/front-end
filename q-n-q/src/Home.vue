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
#bottom{
  display:flex;
  flex-direction:row;
}
hr{
  height:2px;
  background-color:rgb(102, 85, 85);
  border:none;
  margin-top: 1%;
}
#home{
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
