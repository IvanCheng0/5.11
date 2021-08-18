import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import './assets/scss/style.scss'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
