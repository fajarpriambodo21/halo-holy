import Vue from 'vue'

import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
// import Axios from 'Axios'

import './assets/main.css'
Vue.use(BootstrapVue);
Vue.config.productionTip = false
// Vue.config.globalProperties.axios=axios

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
