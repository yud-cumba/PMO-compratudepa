import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    layout: 'public-layout',
  },
  mutations: {
    SET_LAYOUT(state, newLayout) {
      state.layout = newLayout;
    },
  },
});
export default store;
