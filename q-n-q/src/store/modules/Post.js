import axios from 'axios'
import router from '@/router'

const postState = {
    title: "",
    body: "",
    images: [],
    groups: [],
    tags: []
};

const postGetters = {
    getBody: state=> state.body
};

const postActions = {

};

const postMutations = {
    saveBody: (state, body) => {
        console.log("savinf body...");
        state.body = body;
    }

};

export default {
    state: postState,
    getters: postGetters,
    actions: postActions,
    mutations: postMutations
};