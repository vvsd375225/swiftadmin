import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/layout/index.vue'),
    children: [
      { path: 'auth', redirect: '/auth/admin' },
      { path: 'user', redirect: '/user/index' },
      { path: 'system', redirect: '/system/config' },
      { path: 'data', redirect: '/data/security-recycle' },
      { path: 'cms', redirect: '/cms/category' },
      { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/dashboard/index.vue') },
      { path: 'datascreen', name: 'DataScreen', component: () => import('@/views/datascreen/index.vue') },

      { path: 'auth/admin', name: 'AdminList', component: () => import('@/views/auth/admin/index.vue') },
      { path: 'auth/role', name: 'RoleList', component: () => import('@/views/auth/role/index.vue') },
      { path: 'auth/menu', name: 'MenuList', component: () => import('@/views/auth/menu/index.vue') },
      { path: 'user/index', name: 'UserList', component: () => import('@/views/user/index.vue') },
      { path: 'system/config', name: 'SysConfig', component: () => import('@/views/system/config/index.vue') },
      { path: 'system/attachment', name: 'Attachment', component: () => import('@/views/system/attachment/index.vue') },
      { path: 'data/recycle', name: 'Recycle', component: () => import('@/views/data/recycle/index.vue') },
      { path: 'data/security-recycle', name: 'SecurityRecycle', component: () => import('@/views/data/security/recycle.vue') },
      { path: 'data/sensitive-log', name: 'SensitiveLog', component: () => import('@/views/data/security/sensitive-log.vue') },
      { path: 'data/recycle-rule', name: 'RecycleRule', component: () => import('@/views/data/security/recycle-rule.vue') },
      { path: 'data/sensitive-field-rule', name: 'SensitiveFieldRule', component: () => import('@/views/data/security/sensitive-field-rule.vue') },
      { path: 'auth/log', name: 'AuthLog', component: () => import('@/views/auth/log/index.vue') },
      { path: 'user/group', name: 'UserGroup', component: () => import('@/views/user/group.vue') },
      { path: 'generator', name: 'Generator', component: () => import('@/views/generator/index.vue') },
      { path: 'module', name: 'Module', component: () => import('@/views/module/index.vue') },
      { path: 'terminal', name: 'Terminal', component: () => import('@/views/terminal/index.vue') },
      { path: 'ai', name: 'Ai', component: () => import('@/views/ai/index.vue') },
      { path: 'cms/category', name: 'CmsCategory', component: () => import('@/views/cms/category/index.vue') },
      { path: 'cms/article', name: 'CmsArticle', component: () => import('@/views/cms/article/index.vue') },
      { path: 'notification', name: 'Notification', component: () => import('@/views/notification/index.vue') },
      { path: 'cron', name: 'Cron', component: () => import('@/views/cron/index.vue') },
      { path: 'tenant', name: 'Tenant', component: () => import('@/views/tenant/index.vue') },
      { path: 'payment', name: 'Payment', component: () => import('@/views/payment/index.vue') },
      { path: 'monitor', name: 'Monitor', component: () => import('@/views/monitor/index.vue') },
      { path: 'crud', name: 'Crud', component: () => import('@/views/crud/index.vue') },
      { path: 'profile', name: 'Profile', component: () => import('@/views/profile/index.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
