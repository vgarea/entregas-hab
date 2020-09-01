import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store/store';

import Home from '@/views/Home';
import LoginView from '@/views/LoginView';
import UserValidateView from '@/views/UserValidateView';
import FavourListView from '@/views/FavourListView';
import FavourDetailView from '@/views/FavourDetailView';
import AddFavourView from '@/views/AddFavourView';
import RegisterView from '@/views/RegisterView';
import ProfileView from '@/views/ProfileView';
import HeroesView from '@/views/HeroesView';
import AboutView from '@/views/AboutView';
import ErrorView from '@/views/ErrorView';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/activar/',
    name: 'UserValidate',
    component: UserValidateView,
  },
  {
    path: '/favours/',
    name: 'Favours',
    component: FavourListView,
  },
  {
    path: '/favour/:id/',
    name: 'Favour',
    component: FavourDetailView,
  },
  {
    path: '/add-favour/',
    name: 'AddFavour',
    component: AddFavourView,
    beforeEnter: (to, from, next) => {
      if (to.name !== 'Login' && to.name === 'AddFavour' && !store.isLogged()) {
        next({name: 'Login'})
      } else {
        next();
      }
    }
  },
  {
    path: '/register/',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/profile/',
    name: 'Profile',
    component: ProfileView,
  },
  {
    path: '/heroes/',
    name: 'Heroes',
    component: HeroesView,
  },
  {
    path: '/about/',
    name: 'About',
    component: AboutView,
  },  
  {
    path: '*',
    name: 'Error',
    component: ErrorView,
  }
];

export default routes;