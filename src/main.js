// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import myBread from './components/cuscom/myBread.vue'
import MySeverHttp from './plugins/http.js'
import Moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/reset.css'
Vue.use(ElementUI)
Vue.use(MySeverHttp)
Vue.config.productionTip = false// 生产环境 调试不输出信息
/* eslint-disable no-new */
Vue.filter('fmtdate',v=>{
  return Moment(v).format('YYYY-MM-DD')
})
Vue.component(myBread.name,myBread)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
