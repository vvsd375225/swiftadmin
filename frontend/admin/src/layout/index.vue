<template>
  <n-layout class="layout" has-sider>
    <!-- 深色侧边栏 -->
    <n-layout-sider
      :width="collapsed ? 72 : layoutStore.settings.sidebarWidth"
      :native-scrollbar="false"
      class="sider"
    >
      <!-- Logo -->
      <div v-if="layoutStore.settings.showSidebarTop" class="logo" :class="{ 'logo-centered': layoutStore.settings.sidebarTopCentered }" @click="router.push('/dashboard')">
        <div v-if="layoutStore.settings.sidebarTopLogo" class="logo-icon">
          <n-icon size="24" color="#fff"><CubeOutline /></n-icon>
        </div>
        <transition name="logo-fade">
          <span v-if="!collapsed" class="logo-text">SwiftAdmin</span>
        </transition>
      </div>

      <!-- 菜单 -->
      <n-menu
        :value="activeKey"
        :expanded-keys="expandedKeys"
        :options="menuOptions"
        :collapsed="collapsed"
        :collapsed-width="72"
        :indent="20"
        :root-indent="14"
        :accordion="layoutStore.settings.sidebarAccordion"
        class="sidebar-menu"
        @update:value="handleMenuClick"
        @update:expanded-keys="handleExpandedKeys"
      />

      <!-- 底部折叠按钮 -->
      <div class="sider-footer">
        <n-button quaternary class="collapse-btn" @click="layoutStore.settings.sidebarCollapsed = !layoutStore.settings.sidebarCollapsed">
          <template #icon>
            <n-icon size="18"><ChevronBackOutline v-if="!collapsed" /><ChevronForwardOutline v-else /></n-icon>
          </template>
        </n-button>
      </div>
    </n-layout-sider>

    <!-- 右侧主区域 -->
    <n-layout class="main-area">
      <!-- 顶栏 -->
      <n-layout-header class="header">
        <div class="header-left">
          <n-breadcrumb class="breadcrumb">
            <template #separator><n-icon size="14" color="#c0c4cc"><ChevronForwardOutline /></n-icon></template>
            <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
              {{ item.title }}
            </n-breadcrumb-item>
          </n-breadcrumb>
        </div>
        <div class="header-right">
          <n-tooltip>
            <template #trigger>
              <n-button quaternary circle size="small" @click="settingsDrawer?.open()">
                <template #icon><n-icon size="18"><SettingsOutline /></n-icon></template>
              </n-button>
            </template>
            布局配置
          </n-tooltip>

          <n-tooltip>
            <template #trigger>
              <n-button quaternary circle size="small" @click="toggleDark()">
                <template #icon><n-icon size="18"><MoonOutline v-if="!isDark" /><SunnyOutline v-else /></n-icon></template>
              </n-button>
            </template>
            {{ isDark ? '切换亮色模式' : '切换暗黑模式' }}
          </n-tooltip>

          <n-tooltip>
            <template #trigger>
              <n-badge :value="unreadCount" :max="99" :show="unreadCount > 0" dot>
                <n-button quaternary circle size="small" @click="goNotifications">
                  <template #icon><n-icon size="18"><NotificationsOutline /></n-icon></template>
                </n-button>
              </n-badge>
            </template>
            消息通知
          </n-tooltip>

          <n-dropdown :options="userMenuOptions" @select="handleUserAction" placement="bottom-end">
            <div class="user-trigger">
              <n-avatar :size="32" round :style="{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }">
                {{ userStore.info.nickname?.charAt(0) || 'A' }}
              </n-avatar>
              <span class="user-name">{{ userStore.info.nickname || 'Admin' }}</span>
              <n-icon size="14" color="#999"><ChevronDownOutline /></n-icon>
            </div>
          </n-dropdown>
        </div>
      </n-layout-header>

      <!-- 标签页 -->
      <div v-if="tabs.length > 0" class="tabs-bar">
        <div class="tabs-inner">
          <div
            v-for="tab in tabs"
            :key="tab.path"
            class="tab-item"
            :class="{ active: activeTab === tab.path }"
            @click="activeTab = tab.path; router.push(tab.path)"
          >
            <span class="tab-dot" v-if="activeTab === tab.path" />
            <span class="tab-title">{{ tab.title }}</span>
            <n-icon v-if="tabs.length > 1" size="14" class="tab-close" @click.stop="closeTab(tab.path)"><CloseOutline /></n-icon>
          </div>
        </div>
      </div>

      <!-- 内容区 -->
      <n-layout-content class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in"><component :is="Component" /></transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
  <LayoutSettings ref="settingsDrawer" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useLayoutStore } from '@/stores/layout'
import { useDark } from '@vueuse/core'
import { NIcon } from 'naive-ui'
import type { MenuOption, DropdownOption } from 'naive-ui'
import {
  MoonOutline, SunnyOutline, NotificationsOutline, CubeOutline,
  CloseOutline, HomeOutline, ShieldOutline, PeopleOutline, SettingsOutline,
  ServerOutline, CodeOutline, PersonOutline, FlashOutline, BarChartOutline,
  TimeOutline, CardOutline, TvOutline, TerminalOutline, DocumentTextOutline,
  LayersOutline, NewspaperOutline, ChevronBackOutline, ChevronForwardOutline,
  ChevronDownOutline,
} from '@vicons/ionicons5'
import { getUnreadApi } from '@/api/notification'
import LayoutSettings from '@/views/settings/layout.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const layoutStore = useLayoutStore()

const isDark = useDark()
function toggleDark() { layoutStore.settings.darkMode = !layoutStore.settings.darkMode }

const settingsDrawer = ref<InstanceType<typeof LayoutSettings> | null>(null)

const collapsed = computed(() => layoutStore.settings.sidebarCollapsed)
const activeKey = ref(route.path)
const expandedKeys = ref<string[]>([])
const tabs = ref([{ path: '/dashboard', title: '控制台' }])
const activeTab = ref('/dashboard')

const iconMap: Record<string, any> = {
  HomeOutline, ShieldOutline, PeopleOutline, SettingsOutline, ServerOutline,
  CodeOutline, PersonOutline, CubeOutline, NotificationsOutline,
  FlashOutline, BarChartOutline, TimeOutline, CardOutline, TerminalOutline,
  DocumentTextOutline, LayersOutline, NewspaperOutline, TvOutline,
}
const iconAliases: Record<string, string> = {
  'time-outline': 'TimeOutline', 'card-outline': 'CardOutline',
  'code-outline': 'CodeOutline', 'monitor-outline': 'TvOutline',
  'people-outline': 'PeopleOutline',
}

const topIcons: Record<string, any> = {
  'CMS': NewspaperOutline, '消息通知': NotificationsOutline, '数据管理': ServerOutline,
  '权限管理': ShieldOutline, '会员管理': PeopleOutline, '系统管理': SettingsOutline,
  '代码生成': CodeOutline, '个人资料': PersonOutline, '数据大屏': BarChartOutline,
  'AI智能开发': FlashOutline, '模块市场': CubeOutline, '定时任务': TimeOutline,
  '支付管理': CardOutline, 'CRUD生成器': CodeOutline, '租户管理': PeopleOutline,
  'WEB终端': TerminalOutline, '控制台': HomeOutline,
}
const subIcons: Record<string, any> = {
  '管理员管理': ShieldOutline, '角色管理': PeopleOutline, '菜单规则': LayersOutline,
  '管理员日志': DocumentTextOutline, '会员列表': PeopleOutline, '会员分组': LayersOutline,
  '系统配置': SettingsOutline, '附件管理': DocumentTextOutline, '系统监控': TvOutline,
  '回收站': ServerOutline, '栏目管理': LayersOutline, '文章管理': NewspaperOutline,
}

function resolveIcon(name: string, title: string, isChild: boolean): any {
  if (name && iconMap[name]) return iconMap[name]
  if (name && iconAliases[name]) return iconMap[iconAliases[name]]
  if (!isChild && topIcons[title]) return topIcons[title]
  if (isChild && subIcons[title]) return subIcons[title]
  return undefined
}

function transformMenus(menus: any[], isChild = false): MenuOption[] {
  return menus.map(m => {
    const icon = resolveIcon(m.icon, m.title, isChild)
    return {
      label: m.title || m.name,
      key: m.path || m.name || '',
      icon: icon ? () => h(NIcon, null, { default: () => h(icon) }) : undefined,
      children: m.children?.length ? transformMenus(m.children, true) : undefined,
    }
  })
}

const menuOptions = computed(() => transformMenus(userStore.menus))

const breadcrumbs = computed(() => {
  const parts = [{ path: '/', title: '首页' }]
  const matched = route.matched.filter(r => r.path !== '/')
  matched.forEach(r => parts.push({ path: r.path, title: (r.meta?.title as string) || r.name || '' }))
  return parts
})

function findMenuByPath(menus: any[], path: string): any | null {
  for (const m of menus) {
    if (m.path === path) return m
    if (m.children) { const f = findMenuByPath(m.children, path); if (f) return f }
  }
  return null
}
function findMenuLabel(menus: any[], path: string): string | null {
  for (const m of menus) {
    if (m.path === path) return m.title
    if (m.children) { const f = findMenuLabel(m.children, path); if (f) return f }
  }
  return null
}
function hasPath(menus: any[], target: string): boolean {
  for (const m of menus) {
    if (m.path === target) return true
    if (m.children?.length && hasPath(m.children, target)) return true
  }
  return false
}
function findParentKeys(menus: any[], target: string): string[] {
  for (const m of menus) {
    if (m.path === target && m.children?.length) return [m.path]
    if (m.children?.length) {
      if (hasPath(m.children, target)) return [m.path]
      const deeper = findParentKeys(m.children, target)
      if (deeper.length) return [m.path, ...deeper]
    }
  }
  return []
}

function handleExpandedKeys(keys: string[]) { expandedKeys.value = keys }
function syncExpandedKeys() { expandedKeys.value = findParentKeys(userStore.menus, route.path) }

function handleMenuClick(key: string) {
  const menu = findMenuByPath(userStore.menus, key)
  if (menu?.children?.length) { activeKey.value = key; return }
  const tab = tabs.value.find(t => t.path === key)
  if (!tab) {
    const label = findMenuLabel(userStore.menus, key) || key.split('/').pop() || key
    tabs.value.push({ path: key, title: label })
  }
  activeKey.value = key; activeTab.value = key
  router.push(key)
}

function closeTab(path: string) {
  const idx = tabs.value.findIndex(t => t.path === path)
  if (idx === -1) return
  tabs.value.splice(idx, 1)
  if (activeTab.value === path) {
    const next = tabs.value[Math.min(idx, tabs.value.length - 1)]
    if (next) { activeTab.value = next.path; activeKey.value = next.path; router.push(next.path) }
  }
}

const userMenuOptions: DropdownOption[] = [
  { label: '个人资料', key: 'profile' },
  { type: 'divider' },
  { label: '退出登录', key: 'logout' },
]
function handleUserAction(key: string) {
  if (key === 'logout') { userStore.logout(); router.push('/login') }
  else if (key === 'profile') { router.push('/profile') }
}

const unreadCount = ref(0)
let pollTimer: any = null
function goNotifications() { router.push('/notification') }
async function fetchUnread() { try { const r = await getUnreadApi(); unreadCount.value = r.data.count || 0 } catch(e) {} }

onMounted(async () => {
  await userStore.getPermissions()
  syncExpandedKeys()
  fetchUnread()
  pollTimer = setInterval(fetchUnread, 30000)
})
onBeforeUnmount(() => { if(pollTimer) clearInterval(pollTimer) })
watch(() => userStore.menus, () => syncExpandedKeys())
watch(() => route.path, (p) => {
  activeKey.value = p; activeTab.value = p
  syncExpandedKeys()
  if (!tabs.value.find(t => t.path === p)) {
    const label = route.meta?.title as string || p.split('/').pop() || p
    tabs.value.push({ path: p, title: label })
  }
})
</script>

<style scoped>
.layout { height: 100vh; }

/* ========== 深色侧边栏 ========== */
.sider {
  background: var(--sidebar-bg, #1e2022) !important;
  border-right: none !important;
  box-shadow: 2px 0 12px rgba(0,0,0,0.15) !important;
  z-index: 20;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 12px;
  flex-shrink: 0;
  background: var(--sidebar-top-bg, transparent);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
  user-select: none;
  overflow: hidden;
}
.logo-centered { justify-content: center; }
.logo-icon {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #1989fa 0%, #5cb8ff 100%);
  border-radius: 10px;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(25,137,250,0.3);
}
.logo-text {
  font-size: 17px;
  font-weight: 700;
  color: var(--sidebar-top-text, #d8dde3);
  letter-spacing: 0.5px;
  white-space: nowrap;
}
.logo-fade-enter-active, .logo-fade-leave-active { transition: opacity 0.2s; }
.logo-fade-enter-from, .logo-fade-leave-to { opacity: 0; }

/* 菜单 */
.sidebar-menu {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 10px 0;
}
.sidebar-menu :deep(.n-menu) { background: transparent !important; }

/* 一级菜单项 */
.sider :deep(.n-menu .n-menu-item-content) {
  color: var(--sidebar-text, #9aaab8) !important;
  border-radius: 10px;
  margin: 2px 10px;
  padding: 11px 16px !important;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}
.sider :deep(.n-menu .n-menu-item-content::before) {
  content: '';
  position: absolute;
  left: 0; top: 50%; transform: translateY(-50%);
  width: 3px; height: 0;
  background: var(--sidebar-active-text, #5cb8ff);
  border-radius: 0 3px 3px 0;
  transition: height 0.2s ease;
}
.sider :deep(.n-menu .n-menu-item-content:hover) {
  background: var(--sidebar-hover-bg, rgba(255,255,255,0.06)) !important;
  color: var(--sidebar-top-text, #d8dde3) !important;
}
.sider :deep(.n-menu .n-menu-item-content.n-menu-item-content--selected) {
  background: var(--sidebar-active-bg, rgba(25,137,250,0.14)) !important;
  color: var(--sidebar-active-text, #5cb8ff) !important;
  font-weight: 600;
}
.sider :deep(.n-menu .n-menu-item-content.n-menu-item-content--selected::before) {
  height: 20px;
}
.sider :deep(.n-menu .n-menu-item-content .n-icon) {
  color: var(--sidebar-footer-icon, #6e7d8c) !important;
  transition: color 0.2s;
}
.sider :deep(.n-menu .n-menu-item-content:hover .n-icon),
.sider :deep(.n-menu .n-menu-item-content.n-menu-item-content--selected .n-icon) {
  color: var(--sidebar-footer-hover-icon, #5cb8ff) !important;
}

/* 子菜单项 */
.sider :deep(.n-menu .n-submenu .n-menu-item-content) {
  padding-left: 18px !important;
  font-size: 14px;
  color: var(--sidebar-text, #8a99a8) !important;
}
.sider :deep(.n-menu .n-submenu .n-menu-item-content.n-menu-item-content--selected) {
  color: var(--sidebar-active-text, #5cb8ff) !important;
}

/* 折叠按钮 */
.sider-footer {
  flex-shrink: 0;
  padding: 12px;
  border-top: 1px solid rgba(255,255,255,0.06);
  display: flex;
  justify-content: center;
}
.collapse-btn {
  color: var(--sidebar-footer-icon, #6e7d8c) !important;
  width: 36px; height: 36px;
  border-radius: 8px;
}
.collapse-btn:hover {
  color: var(--sidebar-footer-hover-icon, #5cb8ff) !important;
  background: var(--sidebar-footer-hover-bg, rgba(255,255,255,0.08)) !important;
}

/* ========== 主区域 ========== */
.main-area { background: #f0f2f5 !important; }

.header {
  height: 56px;
  padding: 0 20px;
  background: var(--header-bg, #fff) !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  z-index: 15;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-left { display: flex; align-items: center; }
.header-right { display: flex; align-items: center; gap: 6px; }
.breadcrumb { display: flex; align-items: center; font-size: 13px; }

.user-trigger {
  display: flex; align-items: center; gap: 8px;
  cursor: pointer; padding: 4px 10px 4px 5px; border-radius: 8px;
  transition: background 0.15s;
}
.user-trigger:hover { background: var(--header-hover-bg, rgba(0,0,0,0.04)); }
.user-name { font-size: 13px; color: var(--header-text, #333); font-weight: 500; }

/* 标签页 */
.tabs-bar {
  background: #fff;
  flex-shrink: 0;
  border-bottom: 1px solid #ebeef2;
  padding: 0 14px;
  height: 38px;
}
.tabs-inner { display: flex; height: 100%; align-items: flex-end; gap: 1px; }
.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  font-size: 12px;
  color: #909399;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  position: relative;
}
.tab-item:hover { background: #f5f7fa; color: #606266; }
.tab-item.active { background: #f0f2f5; color: #1989fa; font-weight: 600; }
.tab-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #1989fa;
  flex-shrink: 0;
  box-shadow: 0 0 4px rgba(25,137,250,0.4);
}
.tab-close { opacity: 0; transition: opacity 0.15s; color: #c0c4cc; flex-shrink: 0; }
.tab-item:hover .tab-close { opacity: 1; }
.tab-close:hover { color: #e74c3c; }

/* 内容 */
.content {
  padding: 20px;
  background: #f0f2f5;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

/* 过渡 */
.fade-slide-enter-active { transition: all 0.25s ease-out; }
.fade-slide-leave-active { transition: all 0.15s ease-in; }
.fade-slide-enter-from { opacity: 0; transform: translateY(8px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-4px); }
</style>

<!-- 全局（暗黑 + 卡片增强） -->
<style>
/* 暗黑模式 - 覆盖亮色元素 */
html.dark .header { background: #141a23 !important; box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important; }
html.dark .main-area { background: #0d1117 !important; }
html.dark .content { background: #0d1117 !important; }
html.dark .user-name { color: #c8d0d8 !important; }
html.dark .user-trigger:hover { background: rgba(255,255,255,0.06) !important; }
html.dark .tabs-bar { background: #141a23 !important; border-bottom-color: #1e2833 !important; }
html.dark .tab-item { color: #6b7d8e !important; }
html.dark .tab-item:hover { background: #1a2430 !important; color: #a0b0c0 !important; }
html.dark .tab-item.active { background: #1a2430 !important; color: var(--sidebar-active-text, #5cb8ff) !important; }
html.dark .tab-dot { box-shadow: 0 0 4px rgba(92,184,255,0.5) !important; }
html.dark .breadcrumb { color: #8a9db0 !important; }

/* 暗黑模式下顶栏按钮图标颜色 */
html.dark .header-right .n-button { color: #8a9db0 !important; }
html.dark .header-right .n-button:hover { color: #c8d0d8 !important; background: rgba(255,255,255,0.08) !important; }

/* 卡片增强 */
.n-card {
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.04) !important;
  transition: box-shadow 0.25s ease !important;
  border: 1px solid #ebeef2 !important;
}
.n-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04) !important; }
.n-card > .n-card__content { padding: 20px !important; }
.n-data-table { border-radius: 12px; overflow: hidden; }
.n-button { border-radius: 8px !important; font-weight: 500 !important; transition: all 0.2s ease !important; }
.n-button--primary-type { box-shadow: 0 2px 8px rgba(25,137,250,0.25) !important; }
.n-button--primary-type:hover { box-shadow: 0 4px 14px rgba(25,137,250,0.35) !important; transform: translateY(-1px); }
.n-input { border-radius: 8px !important; }
.n-select { border-radius: 8px !important; }
.n-modal .n-card { border-radius: 16px !important; }
.page-wrap { display: flex; flex-direction: column; gap: 16px; }
</style>
