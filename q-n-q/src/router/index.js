import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Quest from '@/components/Quest'
import MyFeed from '@/components/MyFeed'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        mainView:MyFeed
      }
      // children: [{
      //   path:'/quest',
      //   name: 'Quest',
      //   component: Quest
      // }]
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
    },
    {
      path:'/quest',
      name:'Quest',
      components: {mainView:Quest},
      
    }
  ]
})
