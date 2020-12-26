import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import MapsView from '../views/MapsView.vue';
import Chatbot from '../components/Chatbot.vue';
import Inform from '../views/Inform.vue';
import ProjectDetail from '../views/ProjectDetail.vue';
import Advice from '../views/Advice.vue';
import Credits from '../views/Credits.vue';
import Login from '../views/Login.vue';
import Oli from '../views/Oli.vue';
import MyProjects from '../views/MyProjects.vue';
import SignUp from '../views/SignUp.vue';
import Favorite from '../views/Favorite.vue';
import SignUpInmb from '../views/SignUpInmb.vue';
import AddNewProject from '../views/AddNewProject.vue';
import Dashboard from '../views/Dashboard.vue';
import SeparateYourDepa from '../views/SeparateYourDepa.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/maps', component: MapsView },
  { path: '/inform', component: Inform },
  { path: '/chatbot', component: Chatbot },
  { path: '/advices', component: Advice },
  { path: '/detail/:id', component: ProjectDetail },
  { path: '/credits', component: Credits },
  { path: '/login', component: Login },
  { path: '/oli', component: Oli },
  { path: '/myprojects', component: MyProjects },
  { path: '/signup', component: SignUp },
  { path: '/favorite', component: Favorite },
  { path: '/signupInmb', component: SignUpInmb },
  { path: '/addnew', component: AddNewProject },
  { path: '/dashboard', component: Dashboard },
  { path: '/separate', component: SeparateYourDepa },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
