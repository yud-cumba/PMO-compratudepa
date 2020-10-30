import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import * as VueGoogleMaps from 'vue2-google-maps';
import firebase from 'firebase/app';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Home from './views/Home.vue';
import MapsView from './views/MapsView.vue';
import Chatbot from './components/Chatbot.vue';
import Inform from './views/Inform.vue';
import ProjectDetail from './views/ProjectDetail.vue';
// import VueMathjax from 'vue-mathjax';

require('firebase/storage');
// Vue.use(VueMathjax);
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAv4-L5EAusz7jUx09wb8IHNC28drRigTo',
    libraries: 'places', // necessary for places input
  },
});
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/maps', component: MapsView },
    { path: '/inform', component: Inform },
    { path: '/chatbot', component: Chatbot },
    { path: '/detail/:id', component: ProjectDetail },
  ],
});

const firebaseConfig = {
  apiKey: 'AIzaSyCx2hzCMZuWenkJ7l30b2oSBFSoQ3U_3VU',
  authDomain: 'pmo-app-291722.firebaseapp.com',
  databaseURL: 'https://pmo-app-291722.firebaseio.com',
  projectId: 'pmo-app-291722',
  storageBucket: 'pmo-app-291722.appspot.com',
  messagingSenderId: '663134588643',
  appId: '1:663134588643:web:ec1071cabd6a25e2053fd6',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

Vue.prototype.$firebase = firebase;

// eslint-disable-next-line import/prefer-default-export
export const eventBus = new Vue();

new Vue({
  router,
  vuetify,
  firebase,
  render: (h) => h(App),
}).$mount('#app');

Vue.prototype.$axios = axios;
