import axios from 'axios'
import router from '@/router'

const postState = {
    title: "",
    body: "",
    imageFiles: [],
    imageDatas:[],
    groups: [],
    tags: []
};

const postGetters = {
    getBody: state=> state.body,
    getImageDatas: state=> state.imageDatas,
    getTitle: state=> state.title
};

const postActions = {

};

const postMutations = {

    saveTitle: (state, title) =>{
        console.log("saving title...");
        state.title = title;
    },

    saveBody: (state, body) => {
        console.log("saving body...");
        state.body = body;
    },

    saveImageFiles: (state, imageFiles) => {
        console.log("saving imageFiles...");
        state.imageFiles = imageFiles;
    },

    saveImageDatas: (state, imageDatas) => {
        console.log("saving imageDatas...");
        state.imageDatas = imageDatas;
    }

};

export default {
    state: postState,
    getters: postGetters,
    actions: postActions,
    mutations: postMutations
};