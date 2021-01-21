<template>
  <div class="quest">
    <div class="part1" :style="{ 'width': '60%' }">
      <div>
        <label>Title</label>
        <input
          :style="{ width: 'calc(100% - 35pt)' }"
          v-model="title"
          placeholder=""
        />
      </div>
      <label>Body</label>
      <TextEditor />
      <button :style="{'margin': 'auto','margin-top':'5pt'}" @click="">Post</button>
    </div>
    <div class="part1" :style="{ 'width': '40%'}">
      <div class="select">
        <div :style="{ padding: '0% 7%' }">
          <label>Choose Tags</label>
          <input placeholder="for better visibility" v-model="tagQuery"/>
          <div v-if="fetchedTags.length!=0" class="choose-tag tags">
            <ul>
                <li v-for="(name,index) in fetchedTags" :key="index"><Tag @cancle-tag="tagList.splice(index,1)" :value="name" color="blue" customizable="true"/> </li>
            </ul>
          </div>
        </div>
        <div :style="{ padding: '0% 4%' }">
          <label>Choose group</label>
          <input placeholder="choose one group" v-model="groupQuery"/>
          <div v-if="fetchedGroups.length!=0" class="choose-tag tags">
            <ul>
                <li v-for="(name,index) in fetchedGroups" :key="index"><Tag @cancle-tag="tagList.splice(index,1)" :value="name" color="blue" customizable="true"/> </li>
            </ul>
          </div>
        </div>
      </div>
      <label :style="{'margin-left':'20pt'}">Preview</label>
      <ContentView />
    </div>
  </div>
</template>

<script>
import { bus } from "../main";
import TextEditor from "./TextEditor";
import Tag from "./Tag";
import ContentView from "./ContentView";
import { mapActions } from "vuex";
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  name: "Quest",
  components: {
    TextEditor,
    ContentView,
    Tag
  },
  data: function () {
    return {
      title: "",
      fetchedTags:[],
      fetchedGroups:[],
      tagQuery: "",
      groupQuery: ""
    };
  },
  methods: {
    ...mapMutations(['saveTitle'])
    },
  watch:{
    title:function(){
      this.saveTitle(this.title);
    },
    tagQuery: function(){
      this.$http.post('http://localhost:8000/query/tags/',
      {
        tag:this.tagQuery
      }).then(res=>{
        return res.json()
      })
      .then(list=>{
        this.fetchedTags = list;
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  computed:{
    
  }
};
</script>

<style scoped>
.quest {
  width: 80%;
  height:100%;
  margin: auto;
  /* margin-top: 0%; */
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.part1 {
  display: flex;
  flex-direction: column;
  margin:auto;
}
input {
  display: block;
  padding: 3pt;
  margin: 3pt 0;
  border-radius: 4pt;
  border-style: solid;
  border-color: #0a234d;
  border-width: 2pt;
  resize: none;
  width: 100%;
}
.select {
  width: 100%;
  height: min-content;
  display: flex;
  justify-content: space-between;
}
button {
  padding: 0px 10px 0px 10px;
  background-color: #0a76cf;
  color: white;
  border-width: 2px;
  border-radius: 5px;
  border-color: #0a76cf;
  width: 100%;
  max-width: 120px;
  border-style: solid;
  text-align: center;
  font-family: "Quicksand", sans-serif;
  font-size: 14pt;
  height: 35pt;
}
</style>