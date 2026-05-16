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
      { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/dashboard/index.vue') },
      { path: 'datascreen', name: 'DataScreen', component: () => import('@/views/datascreen/index.vue') },
      { path: 'workflow/index', name: 'Workflow', component: () => import('@/views/workflow/index.vue') },
      { path: 'workflow/todo', name: 'WorkflowTodo', component: () => import('@/views/workflow/todo.vue') },
      { path: 'workflow/done', name: 'WorkflowDone', component: () => import('@/views/workflow/done.vue') },
      { path: 'workflow/mine', name: 'WorkflowMine', component: () => import('@/views/workflow/mine.vue') },
      { path: 'auth/admin', name: 'AdminList', component: () => import('@/views/auth/admin/index.vue') },
      { path: 'auth/role', name: 'RoleList', component: () => import('@/views/auth/role/index.vue') },
      { path: 'auth/menu', name: 'MenuList', component: () => import('@/views/auth/menu/index.vue') },
      { path: 'user/index', name: 'UserList', component: () => import('@/views/user/index.vue') },
      { path: 'system/config', name: 'SysConfig', component: () => import('@/views/system/config/index.vue') },
      { path: 'system/attachment', name: 'Attachment', component: () => import('@/views/system/attachment/index.vue') },
      { path: 'data/recycle', name: 'Recycle', component: () => import('@/views/data/recycle/index.vue') },
      // TODO: 后续步骤 - { path: 'auth/log', ... }
      // TODO: 后续步骤 - { path: 'user/group', ... }
      { path: 'generator', name: 'Generator', component: () => import('@/views/generator/index.vue') },
      { path: 'module', name: 'Module', component: () => import('@/views/module/index.vue') },
      { path: 'terminal', name: 'Terminal', component: () => import('@/views/terminal/index.vue') },
      { path: 'ai', name: 'Ai', component: () => import('@/views/ai/index.vue') },
      { path: 'cms/category', name: 'CmsCategory', component: () => import('@/views/cms/category/index.vue') },
      { path: 'cms/article', name: 'CmsArticle', component: () => import('@/views/cms/article/index.vue') },
      { path: 'notification', name: 'Notification', component: () => import('@/views/notification/index.vue') }
      // TODO: 后续步骤 - { path: 'profile', ... }
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
