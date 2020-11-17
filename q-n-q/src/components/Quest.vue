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
      <button :style="{'margin': 'auto','margin-top':'5pt'}" @click="postQuestion">Post</button>
    </div>
    <div class="part1" :style="{ 'width': '40%' }">
      <div class="select">
        <div :style="{ padding: '0% 7%' }">
          <label>Choose group</label>
          <input placeholder="Choose group" />
        </div>
        <div :style="{ padding: '0% 7%' }">
          <label :style="{ padding: '5%' }">Choose Tags</label>
          <input placeholder="Search" />
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
import ContentView from "./ContentView";
import { mapActions } from "vuex";
export default {
  name: "Quest",
  components: {
    TextEditor,
    ContentView,
  },
  data: function () {
    return {
      title: "",
      group: "",
      tag: [],
    };
  },
  methods: {
    ...mapActions(["postThread"]),
    postQuestion: function () {
      bus.$emit("post-called");
      this.$on("collect-body", (body) => {
        postThread(this.data.title, body, this.data.group, this.data.tag);
      });
    },
  },
};
</script>

<style scoped>
.quest {
  width: 100%;
  margin: 0% 10%;
  margin-top: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.part1 {
  display: flex;
  flex-direction: column;
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