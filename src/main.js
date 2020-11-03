import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueGtag from 'vue-gtag';
import router from './route';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { idAnalytics, apiKeyGoogleMap } from './keys/GoogleKeys';

require('firebase/storage');

Vue.use(VueGtag, {
  config: { id: idAnalytics },
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

// eslint-disable-next-line import/prefer-default-export
export const eventBus = new Vue();

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

Vue.prototype.$axios = axios;
