import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: () => import('@/views/home/index.vue'), meta: { title: '首页' } },
  { path: '/article', name: 'Article', component: () => import('@/views/article/index.vue'), meta: { title: '文章' } },
  { path: '/user', name: 'User', component: () => import('@/views/user/index.vue'), meta: { title: '我的' } },
  { path: '/login', name: 'Login', component: () => import('@/views/login/index.vue'), meta: { title: '登录' } },
]

const router = createRouter({ history: createWebHashHistory(), routes })
export default router
