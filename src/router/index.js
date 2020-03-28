import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import users from '../components/user/user.vue'
import right from '../components/rights/right.vue'
import roles from '../components/rights/role.vue'
import { Message } from 'element-ui'
Vue.use(Router)

const router = new Router({
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
        {name:'role',path:'/roles',component:roles}
      ]
    }
  ]
})
router.beforeEach((to,from,next)=>{
  //到哪去的路由
  console.log(to);
  //从来来的路由
  console.log(from);
  if(to.path=="/login"){
    next();
  }else{
    const token = localStorage.getItem("token")
    if (!token) {
      Message.warning('请先登录')
      router.push({
        name:'login'
      })
      return 
    }
    next()
  }
})
export default router
