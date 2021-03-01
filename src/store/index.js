import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const layout = {
  namespaced: true,
  state: {
    layout: 'public-layout',
  },
  mutations: {
    SET_LAYOUT(state, newLayout) {
      state.layout = newLayout;
    },
  },
};

const projects = {
  namespaced: true,
  state: {
    projects: [],
  },
  mutations: {
    SET_PROJECTS(state, newProject) {
      state.projects = newProject;
    },
  },
};

const store = new Vuex.Store({
  modules: {
    layout,
    projects,
  },
});
export default store;
