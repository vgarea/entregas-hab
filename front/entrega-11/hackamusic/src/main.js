import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueHeadful from 'vue-headful';

Vue.component('vue-headful', VueHeadful);


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
