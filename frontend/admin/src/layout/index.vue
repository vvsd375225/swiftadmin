<template>
  <n-layout class="layout" has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      @update:collapsed="collapsed = $event"
    >
      <div class="logo" flex-center>
        <span v-if="!collapsed" class="logo-text">SwiftAdmin</span>
        <span v-else class="logo-text-sm">SA</span>
      </div>
      <n-menu
        :collapsed="collapsed"
        :value="activeKey"
        :options="menuOptions"
        @update:value="handleMenuClick"
      />
    </n-layout-sider>

    <n-layout>
      <n-layout-header bordered class="header" flex-between>
        <div flex items-center>
          <n-button text @click="collapsed = !collapsed">
            <n-icon size="20"><MenuOutline /></n-icon>
          </n-button>
          <n-breadcrumb class="ml-4">
            <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
              {{ item.title }}
            </n-breadcrumb-item>
          </n-breadcrumb>
        </div>
        <div flex items-center gap-3>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button text @click="toggleDark">
                <n-icon size="20"><MoonOutline v-if="!isDark" /><SunnyOutline v-else /></n-icon>
              </n-button>
            </template>
            切换暗黑模式
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-badge :value="unreadCount" :max="99" :show="unreadCount > 0">
                <n-button text @click="goNotifications">
                  <n-icon size="20"><NotificationsOutline /></n-icon>
                </n-button>
              </n-badge>
            </template>
            消息通知
          </n-tooltip>
          <n-dropdown :options="userOptions" @select="handleUserAction">
            <div flex items-center cursor-pointer>
              <n-avatar :size="32" round>{{ userStore.info.nickname?.charAt(0) || 'A' }}</n-avatar>
              <span class="ml-2">{{ userStore.info.nickname || 'Admin' }}</span>
            </div>
          </n-dropdown>
        </div>
      </n-layout-header>

      <n-tabs
        v-model:value="activeTab"
        type="card"
        closable
        @close="closeTab"
        class="tabs"
      >
        <n-tab-pane v-for="tab in tabs" :key="tab.path" :name="tab.path" :tab="tab.title" />
      </n-tabs>

      <n-layout-content class="content">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useDark, useToggle } from '@vueuse/core'
import { MenuOutline, MoonOutline, SunnyOutline, NotificationsOutline } from '@vicons/ionicons5'
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
  return [{ path: '/', title: '首页' }, { path: route.path, title: route.meta?.title || '' }]
})

const userOptions = [
  { key: 'profile', label: '个人资料' },
  { key: 'logout', label: '退出登录' },
]

function handleMenuClick(key: string) {
  router.push(key)
  activeKey.value = key
}

function closeTab(path: string) {
  tabs.value = tabs.value.filter(t => t.path !== path)
}

function handleUserAction(key: string) {
  if (key === 'logout') {
    userStore.logout()
    router.push('/login')
  } else if (key === 'profile') {
    router.push('/profile')
  }
}

const unreadCount = ref(0); let pollTimer: any = null

function goNotifications() { router.push('/notification') }
async function fetchUnread() { try { const r = await getUnreadApi(); unreadCount.value = r.data.count || 0 } catch(e) { /* ignore */ } }

onMounted(() => { fetchUnread(); pollTimer = setInterval(fetchUnread, 30000) })
onBeforeUnmount(() => { if(pollTimer) clearInterval(pollTimer) })

function transformMenus(menus: any[]): any[] {
  return menus.map(m => ({
    label: m.title,
    key: m.path,
    icon: m.icon ? () => null : undefined,
    children: m.children ? transformMenus(m.children) : undefined,
  }))
}
</script>

<style scoped>
.layout { min-height: 100vh; }
.logo { height: 64px; font-size: 18px; font-weight: bold; }
.header { height: 64px; padding: 0 16px; }
.tabs { padding: 0 16px; }
.content { padding: 16px; background: var(--n-color); min-height: calc(100vh - 160px); }
</style>
