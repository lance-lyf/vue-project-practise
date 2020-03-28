import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import users from '../components/user/user.vue'
import right from '../components/rights/right.vue'
import role from '../components/rights/role.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },{
      name: "home",
      path: "/",
      component: Home,
      children:[
        {name:'users',path:'/users',component:users},
        {name:'right',path:'/rights',component:right},
        {name:'role',path:'/role',component:role}
      ]
    }
  ]
})
