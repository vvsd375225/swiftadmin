<template>
  <n-drawer v-model:show="visible" :width="380" placement="right">
    <n-drawer-content title="布局配置" closable>
      <n-tabs v-model:value="activeTab" type="line" justify-content="space-around">
        <!-- 布局 -->
        <n-tab-pane name="layout" tab="布局">
          <div class="setting-group">
            <div class="setting-label">布局方式</div>
            <n-select v-model:value="store.settings.layoutMode" :options="layoutOptions" />
          </div>
          <div class="setting-group">
            <div class="setting-label">侧边菜单宽度 ({{ store.settings.sidebarWidth }}px)</div>
            <n-slider v-model:value="store.settings.sidebarWidth" :min="180" :max="320" :step="10" />
          </div>
          <div class="setting-group">
            <div class="setting-label">侧边菜单水平折叠</div>
            <n-switch v-model:value="store.settings.sidebarCollapsed" />
          </div>
          <div class="setting-group">
            <div class="setting-label">侧边菜单手风琴模式</div>
            <n-switch v-model:value="store.settings.sidebarAccordion" />
          </div>
          <div class="setting-group">
            <div class="setting-label">后台页面切换动画</div>
            <n-switch v-model:value="store.settings.pageTransition" />
          </div>
        </n-tab-pane>

        <!-- 全局 -->
        <n-tab-pane name="global" tab="全局">
          <div class="setting-group">
            <div class="setting-label">暗黑模式</div>
            <n-switch v-model:value="store.settings.darkMode" />
          </div>
          <div class="setting-group">
            <div class="setting-label">后台页面切换动画</div>
            <n-switch v-model:value="store.settings.pageTransition" />
          </div>
        </n-tab-pane>

        <!-- 侧边栏 -->
        <n-tab-pane name="sidebar" tab="侧边栏">
          <div class="setting-group">
            <div class="setting-label">侧边菜单栏背景色</div>
            <n-color-picker v-model:value="store.settings.sidebarBgColor" :modes="['hex']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">侧边菜单激活项背景色</div>
            <n-color-picker v-model:value="store.settings.sidebarActiveBg" :modes="['rgb']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">侧边菜单激活项文字色</div>
            <n-color-picker v-model:value="store.settings.sidebarActiveText" :modes="['hex']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">侧边菜单文字颜色</div>
            <n-color-picker v-model:value="store.settings.sidebarTextColor" :modes="['hex']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">侧边菜单悬停时背景色</div>
            <n-color-picker v-model:value="store.settings.sidebarHoverBg" :modes="['rgb']" />
          </div>

          <n-divider>顶栏设置</n-divider>

          <div class="setting-group">
            <div class="setting-label">显示侧边菜单顶栏</div>
            <n-switch v-model:value="store.settings.showSidebarTop" />
          </div>
          <div class="setting-group">
            <div class="setting-label">侧边菜单顶栏背景色</div>
            <n-color-picker v-model:value="store.settings.sidebarTopBg" :modes="['hex']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">侧边菜单顶栏文字色</div>
            <n-color-picker v-model:value="store.settings.sidebarTopText" :modes="['hex']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">侧边菜单顶栏内容居中</div>
            <n-switch v-model:value="store.settings.sidebarTopCentered" />
          </div>
          <div class="setting-group">
            <div class="setting-label">侧边菜单顶栏显示LOGO</div>
            <n-switch v-model:value="store.settings.sidebarTopLogo" />
          </div>

          <n-divider>底部工具栏</n-divider>

          <div class="setting-group">
            <div class="setting-label">底部工具栏自动隐藏</div>
            <n-switch v-model:value="store.settings.sidebarFooterAutoHide" />
          </div>
          <div class="setting-group">
            <div class="setting-label">底部工具栏图标颜色</div>
            <n-color-picker v-model:value="store.settings.sidebarFooterIconColor" :modes="['hex']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">底部工具栏悬停图标色</div>
            <n-color-picker v-model:value="store.settings.sidebarFooterHoverIconColor" :modes="['hex']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">底部工具栏悬停背景色</div>
            <n-color-picker v-model:value="store.settings.sidebarFooterHoverBg" :modes="['rgb']" />
          </div>
        </n-tab-pane>

        <!-- 顶栏 -->
        <n-tab-pane name="header" tab="顶栏">
          <div class="setting-group">
            <div class="setting-label">顶栏背景色</div>
            <n-color-picker v-model:value="store.settings.headerBgColor" :modes="['hex']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">顶栏文字色</div>
            <n-color-picker v-model:value="store.settings.headerTextColor" :modes="['hex']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">顶栏悬停时背景色</div>
            <n-color-picker v-model:value="store.settings.headerHoverBg" :modes="['rgb']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">顶栏激活项背景色</div>
            <n-color-picker v-model:value="store.settings.headerActiveBg" :modes="['rgb']" />
          </div>
          <div class="setting-group">
            <div class="setting-label">顶栏激活项文字色</div>
            <n-color-picker v-model:value="store.settings.headerActiveText" :modes="['hex']" />
          </div>
        </n-tab-pane>
      </n-tabs>

      <template #footer>
        <div class="drawer-footer">
          <n-button @click="handleReset" type="warning" ghost>恢复默认</n-button>
          <n-button @click="visible = false">关闭</n-button>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  NDrawer, NDrawerContent, NTabs, NTabPane, NSelect, NSlider,
  NSwitch, NColorPicker, NButton, NDivider,
} from 'naive-ui'
import { useLayoutStore } from '@/stores/layout'

const store = useLayoutStore()
const visible = ref(false)

const activeTab = ref('layout')

const layoutOptions = [
  { label: '默认', value: 'default' },
  { label: '经典', value: 'classic' },
  { label: '单栏', value: 'single' },
]

function handleReset() {
  store.reset()
}

function open() { visible.value = true }
function close() { visible.value = false }

defineExpose({ open, close })
</script>

<style scoped>
.setting-group {
  margin-bottom: 18px;
}
.setting-label {
  font-size: 13px;
  color: #606266;
  margin-bottom: 8px;
  font-weight: 500;
}
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
