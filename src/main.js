import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import Home from './views/Home'
import MapsView from './views/MapsView';
import Inform from './views/Inform'
import VueMathjax from 'vue-mathjax';

Vue.use(VueMathjax);
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
  { path: '/', component: Home },
  { path: '/maps', component: MapsView },
  { path: '/inform', component: Inform },
  ]
})
new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
