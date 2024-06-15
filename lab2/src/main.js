import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

Vue.config.productionTip = false;

Vue.use(Toast);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
