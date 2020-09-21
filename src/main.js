import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import Home from './views/Home'
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
  { path: '/', component: Home },
  ]
})
new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
