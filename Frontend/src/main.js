import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkZlbGlwZSIsImVtYWlsIjoiZmVsaXBlZW5uZUBnbWFpbC5jb20iLCJhZG1pbiI6ImZhbHNlIiwiaWF0IjoxNjQ0ODUyNzQ3LCJleHAiOjE2NDUxMTE5NDd9.gy-s1Zw0qrKW1s5TYu3Um5gMB1V184AV6R3io45RvSg'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')