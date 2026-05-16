<template>
  <n-layout class="layout" has-sider>
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :collapsed="collapsed"
      :native-scrollbar="false"
      class="sider"
    >
      <div class="logo" flex-center>
        <n-icon size="24" color="#fff" :component="CubeOutline" />
        <span v-show="!collapsed" class="logo-text">SwiftAdmin</span>
      </div>
      <n-menu
        :collapsed="collapsed"
        :value="activeKey"
        :options="menuOptions"
        :root-indent="18"
        :indent="24"
        @update:value="handleMenuClick"
      />
    </n-layout-sider>

    <n-layout class="main-area">
      <n-layout-header class="header" flex-between>
        <div flex items-center>
          <n-button quaternary circle @click="collapsed = !collapsed">
            <template #icon><n-icon size="20"><MenuOutline /></n-icon></template>
          </n-button>
          <n-breadcrumb class="breadcrumb">
            <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">{{ item.title }}</n-breadcrumb-item>
          </n-breadcrumb>
        </div>
        <div flex items-center style="gap:8px">
          <n-tooltip>
            <template #trigger><n-button quaternary circle @click="toggleDark"><template #icon><n-icon size="20"><MoonOutline v-if="!isDark" /><SunnyOutline v-else /></n-icon></template></n-button></template>
            切换暗黑模式
          </n-tooltip>
          <n-tooltip>
            <template #trigger><n-badge :value="unreadCount" :max="99" :show="unreadCount > 0"><n-button quaternary circle @click="goNotifications"><template #icon><n-icon size="20"><NotificationsOutline /></n-icon></template></n-button></n-badge></template>
            消息通知
          </n-tooltip>
          <n-dropdown :options="userOptions" @select="handleUserAction">
            <div class="user-trigger" flex items-center>
              <n-avatar :size="32" round :style="{ backgroundColor: '#1989fa' }">{{ userStore.info.nickname?.charAt(0) || 'A' }}</n-avatar>
              <span class="user-name">{{ userStore.info.nickname || 'Admin' }}</span>
              <n-icon size="14" color="#999"><ChevronDownOutline /></n-icon>
            </div>
          </n-dropdown>
        </div>
      </n-layout-header>

      <div class="tabs-bar" v-if="tabs.length > 0">
        <n-scrollbar x-scrollable>
          <div class="tabs-inner">
            <div v-for="tab in tabs" :key="tab.path" class="tab-item" :class="{ active: activeTab === tab.path }" @click="activeTab = tab.path; router.push(tab.path)">
              <span class="tab-title">{{ tab.title }}</span>
              <n-icon v-if="tabs.length > 1" size="14" class="tab-close" @click.stop="closeTab(tab.path)"><CloseOutline /></n-icon>
            </div>
          </div>
        </n-scrollbar>
      </div>

      <n-layout-content class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in"><component :is="Component" /></transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useDark, useToggle } from '@vueuse/core'
import { MenuOutline, MoonOutline, SunnyOutline, NotificationsOutline, CubeOutline, ChevronDownOutline, CloseOutline } from '@vicons/ionicons5'
import { getUnreadApi } from '@/api/notification'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const collapsed = ref(false)
const isDark = useDark()
const toggleDark = useToggle(isDark)

const menuOptions = computed(() => transformMenus(userStore.menus))
const activeKey = ref(route.path)
const tabs = ref([{ path: '/dashboard', title: '控制台' }])
const activeTab = ref('/dashboard')

const breadcrumbs = computed(() => {
  const parts = [{ path: '/', title: '首页' }]
  const matched = route.matched.filter(r => r.path !== '/')
  matched.forEach(r => parts.push({ path: r.path, title: (r.meta?.title as string) || r.name || '' }))
  return parts
})

const userOptions = [{ key: 'profile', label: '个人资料' }, { key: 'divider', type: 'divider' as const }, { key: 'logout', label: '退出登录' }]

function findMenuLabel(menus: any[], path: string): string | null {
  for (const m of menus) { if (m.path === path) return m.title; if (m.children) { const f = findMenuLabel(m.children, path); if (f) return f } }
  return null
}

function handleMenuClick(key: string) {
  const tab = tabs.value.find(t => t.path === key)
  if (!tab) { const label = findMenuLabel(userStore.menus, key); tabs.value.push({ path: key, title: label || key.split('/').pop() || key }) }
  activeKey.value = key; activeTab.value = key; router.push(key)
}

function closeTab(path: string) {
  const idx = tabs.value.findIndex(t => t.path === path)
  if (idx === -1) return
  tabs.value.splice(idx, 1)
  if (activeTab.value === path) { const next = tabs.value[Math.min(idx, tabs.value.length - 1)]; if (next) { activeTab.value = next.path; activeKey.value = next.path; router.push(next.path) } }
}

function handleUserAction(key: string) { if (key === 'logout') { userStore.logout(); router.push('/login') } else if (key === 'profile') { router.push('/profile') } }
const unreadCount = ref(0); let pollTimer: any = null
function goNotifications() { router.push('/notification') }
async function fetchUnread() { try { const r = await getUnreadApi(); unreadCount.value = r.data.count || 0 } catch(e) {} }
onMounted(() => { fetchUnread(); pollTimer = setInterval(fetchUnread, 30000) })
onBeforeUnmount(() => { if(pollTimer) clearInterval(pollTimer) })

watch(() => route.path, (p) => { activeKey.value = p; activeTab.value = p; const found = tabs.value.find(t => t.path === p); if (!found) { const label = route.meta?.title as string || p.split('/').pop() || p; tabs.value.push({ path: p, title: label }) } })

function transformMenus(menus: any[]): any[] {
  return menus.map(m => ({ label: m.title || m.name, key: m.path || '', children: m.children?.length ? transformMenus(m.children) : undefined }))
}
</script>

<style>
.n-card { border-radius: 8px !important; box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04) !important; transition: box-shadow 0.2s ease !important; }
.n-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06) !important; }
.n-card > .n-card__content { padding: 20px !important; }
.n-data-table { border-radius: 8px; overflow: hidden; }
.n-button { border-radius: 6px !important; font-weight: 500 !important; }
.page-wrap { display: flex; flex-direction: column; gap: 16px; }
.fade-slide-enter-active { transition: all 0.25s ease-out; }
.fade-slide-leave-active { transition: all 0.15s ease-in; }
.fade-slide-enter-from { opacity: 0; transform: translateY(8px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-4px); }
</style>

<style scoped>
.layout { height: 100vh; }
.sider { background: linear-gradient(180deg, #001529 0%, #002140 100%) !important; box-shadow: 2px 0 8px rgba(0,0,0,0.08) !important; z-index: 10; }
.logo { height: 64px; display: flex; align-items: center; justify-content: center; color: #fff; gap: 10px; flex-shrink: 0; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 4px; }
.logo-text { font-size: 18px; font-weight: 700; letter-spacing: 1px; white-space: nowrap; }
.sider :deep(.n-menu) { background: transparent !important; }
.sider :deep(.n-menu .n-menu-item) { margin: 2px 8px; border-radius: 6px; color: rgba(255,255,255,0.75); }
.sider :deep(.n-menu .n-menu-item:hover) { background: rgba(255,255,255,0.08) !important; color: #fff; }
.sider :deep(.n-menu .n-menu-item.n-menu-item--selected) { background: #1989fa !important; color: #fff !important; font-weight: 600; }
.main-area { background: #f5f7fa !important; }
.header { height: 56px; padding: 0 20px; background: #fff !important; box-shadow: 0 1px 4px rgba(0,0,0,0.04); z-index: 9; flex-shrink: 0; }
.breadcrumb { margin-left: 12px; }
.user-trigger { gap: 8px; cursor: pointer; padding: 4px 8px; border-radius: 6px; }
.user-trigger:hover { background: rgba(0,0,0,0.04); }
.user-name { font-size: 14px; color: #333; }
.tabs-bar { background: #fff; flex-shrink: 0; border-bottom: 1px solid #eee; padding: 0 12px; height: 40px; }
.tabs-inner { display: flex; height: 100%; align-items: flex-end; gap: 2px; }
.tab-item { display: flex; align-items: center; gap: 6px; padding: 6px 14px; font-size: 13px; color: #666; border-radius: 6px 6px 0 0; cursor: pointer; background: transparent; transition: all 0.15s; white-space: nowrap; }
.tab-item:hover { background: #f0f2f5; color: #333; }
.tab-item.active { background: #f5f7fa; color: #1989fa; font-weight: 500; }
.tab-close { opacity: 0; transition: opacity 0.15s; color: #999; }
.tab-item:hover .tab-close { opacity: 1; }
.tab-close:hover { color: #e74c3c; }
.content { padding: 20px; background: #f5f7fa; overflow-y: auto; flex: 1; min-height: 0; }
</style>
