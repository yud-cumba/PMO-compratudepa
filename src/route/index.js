import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import MapsView from '../views/MapsView.vue';
import Chatbot from '../components/Chatbot.vue';
import Inform from '../views/Inform.vue';
import ProjectDetail from '../views/ProjectDetail.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/maps/:distric', component: MapsView },
  { path: '/inform', component: Inform },
  { path: '/chatbot', component: Chatbot },
  { path: '/detail/:id', component: ProjectDetail },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
