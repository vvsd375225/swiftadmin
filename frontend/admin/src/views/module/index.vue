<template>
  <div>
    <n-card title="模块市场" class="mb-4">
      <template #header-extra>
        <n-tag type="info">{{ modules.length }} 个模块</n-tag>
      </template>
      <n-spin :show="loading">
        <n-grid :cols="3" :x-gap="16" :y-gap="16">
          <n-grid-item v-for="m in modules" :key="m.name">
            <n-card size="small" :bordered="true">
              <template #header>
                <n-space align="center">
                  <strong>{{ m.title }}</strong>
                  <n-tag :type="m.installed ? (m.status ? 'success' : 'warning') : 'default'" size="small">
                    {{ m.installed ? (m.status ? '已启用' : '已禁用') : '未安装' }}
                  </n-tag>
                </n-space>
              </template>
              <p class="text-gray text-sm mb-2">{{ m.description || '暂无描述' }}</p>
              <n-space class="text-xs text-gray mb-2">
                <span>v{{ m.version }}</span>
                <span v-if="m.author">· {{ m.author }}</span>
              </n-space>
              <div class="mt-3">
                <n-space v-if="!m.installed">
                  <n-button type="primary" size="small" :loading="acting === m.name" @click="handleInstall(m.name)">
                    安装
                  </n-button>
                </n-space>
                <n-space v-else>
                  <n-button v-if="m.status" size="small" :loading="acting === m.name" @click="handleDisable(m.name)">
                    禁用
                  </n-button>
                  <n-button v-else type="primary" size="small" :loading="acting === m.name" @click="handleEnable(m.name)">
                    启用
                  </n-button>
                  <n-button type="error" size="small" :loading="acting === m.name" @click="handleUninstall(m.name)">
                    卸载
                  </n-button>
                </n-space>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
        <n-empty v-if="!loading && modules.length === 0" description="暂无模块，请将模块文件夹放入 modules 目录" />
      </n-spin>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMessage, useDialog } from 'naive-ui'
import {
  getModuleListApi,
  installModuleApi,
  uninstallModuleApi,
  enableModuleApi,
  disableModuleApi,
} from '@/api/module'

const message = useMessage()
const dialog = useDialog()
const loading = ref(false)
const acting = ref('')
const modules = ref<any[]>([])

async function fetchData() {
  loading.value = true
  try {
    const res = await getModuleListApi()
    modules.value = res.data.list || []
  } finally { loading.value = false }
}

function handleInstall(name: string) {
  dialog.warning({
    title: '确认安装',
    content: `确定要安装模块「${name}」吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      acting.value = name
      try { await installModuleApi(name); message.success('安装成功'); fetchData() }
      finally { acting.value = '' }
    },
  })
}

function handleUninstall(name: string) {
  dialog.warning({
    title: '确认卸载',
    content: `确定要卸载模块「${name}」吗？卸载后将删除模块数据。`,
    positiveText: '确定卸载',
    negativeText: '取消',
    onPositiveClick: async () => {
      acting.value = name
      try { await uninstallModuleApi(name); message.success('已卸载'); fetchData() }
      finally { acting.value = '' }
    },
  })
}

async function handleEnable(name: string) {
  acting.value = name
  try { await enableModuleApi(name); message.success('已启用'); fetchData() }
  finally { acting.value = '' }
}

async function handleDisable(name: string) {
  acting.value = name
  try { await disableModuleApi(name); message.success('已禁用'); fetchData() }
  finally { acting.value = '' }
}

onMounted(fetchData)
</script>

<style scoped>
.text-gray { color: var(--n-text-color-3) }
.text-sm { font-size: 13px }
.text-xs { font-size: 12px }
</style>
