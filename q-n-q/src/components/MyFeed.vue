<template>
  <div id="content">
        <div id="bar">
          <div class="tab">My Feed</div>
          <div class="tab">Trending</div>
          <div class="tab">Latest</div>
        </div>
        <div id="cards">
          <div class="ithcard">
            <div class="group-info"></div>
            <div class="thread-info"></div>
            <div class="rating"></div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    name:"MyFeed"
}
</script>

<style scoped>

#content{
  display: flex;
  justify-content: center;
  width: 100%;
}
#bar{
  display:flex;
  flex-direction:row;
  justify-content: center;
}
.tab{
  padding:2% 5%;
  min-width:50%;
  width:100px;
  height:fit-content;
  text-align: center;
  border-style: solid;
  border-color:skyblue;
  border-width: 2px;
  border-top: none;
  border-bottom: none;
  border-radius:1px;
  background-color: lightgray;
}

</style>