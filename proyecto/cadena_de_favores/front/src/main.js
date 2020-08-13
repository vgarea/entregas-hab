import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueHeadful from 'vue-headful';

Vue.config.productionTip = false;
Vue.component('vue-headful', VueHeadful);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');