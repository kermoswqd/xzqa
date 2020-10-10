import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//导入页面组件
import Header from '../components/MintUI/Header.vue';
import Button from '../components/MintUI/Button.vue';
import Field from '../components/MintUI/Field.vue';
import Navbar from '../components/MintUI/Navbar.vue';
import Infinite from '../components/MintUI/Infinite.vue';
import Qs from '../components/MintUI/Qs.vue';
import Swiper from '../views/Swiper.vue';
import Login from '../views/Login.vue';

// 项目实践页面
import Register from '../views/Register.vue';
import Me from '../views/Me.vue';
import Article from '../views/Article.vue';

Vue.use(VueRouter)

const routes = [
  {
    path:'/header',
    component:Header
  },
  {
    path:'/qs',
    component:Qs
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/swiper',
    component:Swiper
  },
  {
    path:'/infinite',
    component:Infinite
  },
  {
    path:'/navbar',
    component:Navbar
  },
  {
    path:'/field',
    component:Field
  },
  {
    path:'/button',
    component:Button
  },
  {
    path: '/register',    
    component: Register
  },
  {
    path: '/article/:id',    
    component: Article
  },  
  {
    path: '/me',    
    component: Me
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
