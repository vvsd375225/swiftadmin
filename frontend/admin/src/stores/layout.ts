import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface LayoutSettings {
  layoutMode: 'default' | 'classic' | 'single'
  darkMode: boolean
  pageTransition: boolean
  sidebarBgColor: string
  sidebarActiveBg: string
  sidebarActiveText: string
  sidebarTextColor: string
  sidebarHoverBg: string
  sidebarWidth: number
  sidebarCollapsed: boolean
  sidebarAccordion: boolean
  showSidebarTop: boolean
  sidebarTopBg: string
  sidebarTopText: string
  sidebarTopCentered: boolean
  sidebarTopLogo: boolean
  sidebarFooterAutoHide: boolean
  sidebarFooterIconColor: string
  sidebarFooterHoverIconColor: string
  sidebarFooterHoverBg: string
  headerBgColor: string
  headerTextColor: string
  headerHoverBg: string
  headerActiveBg: string
  headerActiveText: string
}

const defaults: LayoutSettings = {
  layoutMode: 'default',
  darkMode: false,
  pageTransition: true,
  sidebarBgColor: '#1e2022',
  sidebarActiveBg: 'rgba(25,137,250,0.14)',
  sidebarActiveText: '#5cb8ff',
  sidebarTextColor: '#9aaab8',
  sidebarHoverBg: 'rgba(255,255,255,0.06)',
  sidebarWidth: 240,
  sidebarCollapsed: false,
  sidebarAccordion: true,
  showSidebarTop: true,
  sidebarTopBg: 'transparent',
  sidebarTopText: '#d8dde3',
  sidebarTopCentered: false,
  sidebarTopLogo: true,
  sidebarFooterAutoHide: false,
  sidebarFooterIconColor: '#6e7d8c',
  sidebarFooterHoverIconColor: '#5cb8ff',
  sidebarFooterHoverBg: 'rgba(255,255,255,0.08)',
  headerBgColor: '#ffffff',
  headerTextColor: '#333333',
  headerHoverBg: 'rgba(0,0,0,0.04)',
  headerActiveBg: 'rgba(25,137,250,0.1)',
  headerActiveText: '#1989fa',
}

function load(): LayoutSettings {
  try {
    const raw = localStorage.getItem('swift_layout_settings')
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch {}
  return { ...defaults }
}

export const useLayoutStore = defineStore('layout', () => {
  const settings = ref<LayoutSettings>(load())

  function save() {
    localStorage.setItem('swift_layout_settings', JSON.stringify(settings.value))
    applyTheme(settings.value)
  }

  function reset() {
    settings.value = { ...defaults }
    save()
  }

  function applyTheme(s: LayoutSettings) {
    const root = document.documentElement
    root.style.setProperty('--sidebar-bg', s.sidebarBgColor)
    root.style.setProperty('--sidebar-active-bg', s.sidebarActiveBg)
    root.style.setProperty('--sidebar-active-text', s.sidebarActiveText)
    root.style.setProperty('--sidebar-text', s.sidebarTextColor)
    root.style.setProperty('--sidebar-hover-bg', s.sidebarHoverBg)
    root.style.setProperty('--sidebar-width', s.sidebarWidth + 'px')
    root.style.setProperty('--sidebar-top-bg', s.sidebarTopBg)
    root.style.setProperty('--sidebar-top-text', s.sidebarTopText)
    root.style.setProperty('--sidebar-footer-icon', s.sidebarFooterIconColor)
    root.style.setProperty('--sidebar-footer-hover-icon', s.sidebarFooterHoverIconColor)
    root.style.setProperty('--sidebar-footer-hover-bg', s.sidebarFooterHoverBg)
    root.style.setProperty('--header-bg', s.headerBgColor)
    root.style.setProperty('--header-text', s.headerTextColor)
    root.style.setProperty('--header-hover-bg', s.headerHoverBg)
    root.style.setProperty('--header-active-bg', s.headerActiveBg)
    root.style.setProperty('--header-active-text', s.headerActiveText)
    root.classList.toggle('dark', s.darkMode)
  }

  watch(settings, save, { deep: true })
  applyTheme(settings.value)

  return { settings, save, reset, applyTheme }
})
