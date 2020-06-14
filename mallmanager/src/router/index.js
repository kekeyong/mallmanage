import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users'
import Right from '@/components/rights/right'
import Role from '@/components/rights/role'
import Goodslist from '@/components/goods/goodslist'
import Goodsadd from '@/components/goods/goodsadd'
import Cateparams from '@/components/goods/cateparams'
import Goodscate from '@/components/goods/goodscate'
import Reports from '@/components/reports/reports'

import{Message} from 'element-ui'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: 'users',
          name: 'users',
          component: Users
        },
        {
          path: 'rights',
          name: 'rights',
          component: Right
        },
        {
          path: 'roles',
          name: 'roles',
          component: Role
        },
        {
          path: 'goods',
          name: 'goods',
          component: Goodslist
        },
        {
          path: 'goodsadd',
          name: 'goodsadd',
          component: Goodsadd
        },
        {
          path: '/params',
          name: 'params',
          component: Cateparams
        },
        {
          path: '/categories',
          name: 'categories',
          component: Goodscate
        },
        {
          path: '/reports',
          name: 'reports',
          component: Reports
        },
      ]
    },



  ]
})

//在路由配置生效之前统一的判断token
//路由守卫  在路由配置生效之前触发调用
router.beforeEach((to,from,next)=>{
  console.log(to,from);
  if(to.path === '/login'){
    next()
  }else{
    const token = localStorage.getItem('token')
    Message.warning('请先登录')
    if(!token){
      router.push({
        name:'login'
      })
      return
    }
    next()
  }
  
  
})

export default router
