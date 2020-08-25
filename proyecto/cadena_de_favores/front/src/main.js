import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import routes from '@/router/index';
import VueHeadful from 'vue-headful';

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
});

Vue.component('vue-headful', VueHeadful);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');