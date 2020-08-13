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
    component: () => import('../views/Favours.vue'),
    meta: {      
    },
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: () => import('../views/Heroes.vue'),
    meta: {
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
    },
  },
  {
    path: '/add-favour',
    name: 'AddFavour',
    component: () => import('../views/AddFavour.vue'),
    meta: {
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
    },
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue'),
    meta: {
    },
  }
];

const router = new VueRouter({
  routes
});

export default router;