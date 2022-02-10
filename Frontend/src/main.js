import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkZlbGlwZSIsImVtYWlsIjoiZmVsaXBlZW5uZUBnbWFpbC5jb20iLCJhZG1pbiI6ImZhbHNlIiwiaWF0IjoxNjQ0NDUxNjc2LCJleHAiOjE2NDQ3MTA4NzZ9.fvVJ9Fv065sS_x0qYgEkYA4vqfkxRwXQswk-IRWaJsg'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')