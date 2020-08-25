import Vue from 'vue';
import VueRouter from 'vue-router';
import api from '@/api/api';

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
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: () => import('../views/HeroesView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/add-favour',
    name: 'AddFavour',
    component: () => import('../views/AddFavourView.vue'),
    /* beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && to.name === 'AddFavour' && !api.isLoggedIn()) {
          next({name: 'login'})
      } else {
          next();
      }
    } */
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    /* beforeEnter: (to, from, next) => {
      if (to.name !== 'login' && to.name === 'AddFavour' && !api.isLoggedIn()) {
        next({name: 'login'})
      } else {
          next();
      }
    } */
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/ErrorView.vue'),
  }
];

/* const router = new VueRouter({
  routes
});

export default router; */

export default routes;