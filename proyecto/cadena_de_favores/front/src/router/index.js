import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/favours',
    name: 'Favours',
    component: () => import('../views/FavoursView.vue'),
    meta: {      
    },
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: () => import('../views/HeroesView.vue'),
    meta: {
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: {
    },
  },
  {
    path: '/add-favour',
    name: 'AddFavour',
    component: () => import('../views/AddFavourView.vue'),
    meta: {
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: {
    },
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/ErrorView.vue'),
    meta: {
    },
  }
];

const router = new VueRouter({
  routes
});

export default router;