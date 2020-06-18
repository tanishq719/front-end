import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
import Header from '@/components/Header'
import Signup from '@/components/Signup'
import HumbergMenu from '@/components/HumbergMenu'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: {
        default: Home,
        Header,
        HumbergMenu
      }
    },
    {
      path:'/signup',
      name:'Signup',
      component: Signup
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    }
  ]
})
