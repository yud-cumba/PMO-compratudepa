import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import * as VueGoogleMaps from 'vue2-google-maps';
import firebase from 'firebase/app';
import VueGtag from 'vue-gtag';
import router from './route';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { firebaseConfig, apiKeyGoogleMap } from './keys/GoogleKeys';

require('firebase/storage');

Vue.use(VueGtag, {
  config: { id: 'G-7XCKGK5MQZ' },
});

// Vue.use(VueMathjax);
Vue.use(VueRouter);

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: apiKeyGoogleMap,
    libraries: 'places', // necessary for places input
  },
});
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
