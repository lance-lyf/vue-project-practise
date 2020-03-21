// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import MySeverHttp from './plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/reset.css'
Vue.use(ElementUI)
Vue.use(MySeverHttp)
Vue.config.productionTip = false// 生产环境 调试不输出信息
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
