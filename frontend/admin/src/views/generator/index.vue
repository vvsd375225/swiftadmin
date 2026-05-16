<template>
  <div style="display: flex; gap: 16px; height: calc(100vh - 200px)">
    <n-card title="数据表" style="width: 260px; flex-shrink: 0">
      <n-spin :show="tableLoading">
        <n-menu
          v-model:value="selectedTable"
          :options="tableOptions"
          @update:value="handleTableSelect"
        />
      </n-spin>
    </n-card>

    <n-card style="flex: 1; overflow: auto">
      <template v-if="selectedTable">
        <n-space align="center" class="mb-4">
          <n-tag type="info">{{ selectedTable }}</n-tag>
          <n-button type="primary" size="small" @click="handlePreview">预览代码</n-button>
          <n-button type="success" size="small" @click="handleGenerate">一键生成</n-button>
        </n-space>

        <n-data-table
          :columns="fieldColumns"
          :data="fields"
          :loading="fieldLoading"
          size="small"
          max-height="180"
          class="mb-4"
          row-key="name"
        />

        <div v-if="previewCode" style="flex: 1; overflow: hidden">
          <n-tabs v-model:value="activeTab" type="segment">
            <n-tab-pane name="controller" tab="Controller">
              <n-scrollbar style="max-height: 480px">
                <pre class="code-block">{{ previewCode.controller }}</pre>
              </n-scrollbar>
            </n-tab-pane>
            <n-tab-pane name="vue" tab="Vue">
              <n-scrollbar style="max-height: 480px">
                <pre class="code-block">{{ previewCode.vue }}</pre>
              </n-scrollbar>
            </n-tab-pane>
            <n-tab-pane name="api" tab="API">
              <n-scrollbar style="max-height: 480px">
                <pre class="code-block">{{ previewCode.api }}</pre>
              </n-scrollbar>
            </n-tab-pane>
            <n-tab-pane name="route" tab="Route">
              <n-scrollbar style="max-height: 480px">
                <pre class="code-block">{{ previewCode.route }}</pre>
              </n-scrollbar>
            </n-tab-pane>
          </n-tabs>
        </div>

        <n-empty v-else description="点击「预览代码」查看生成内容" />
      </template>

      <n-empty v-else description="请先选择左侧数据表" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { NTag, useMessage } from 'naive-ui'
import {
  getGeneratorTablesApi,
  getGeneratorFieldsApi,
  previewGeneratorApi,
  generateCodeApi,
} from '@/api/generator'

const message = useMessage()
const tableLoading = ref(false)
const fieldLoading = ref(false)
const selectedTable = ref('')
const tableOptions = ref<any[]>([])
const fields = ref<any[]>([])
const previewCode = ref<any>(null)
const activeTab = ref('controller')

const fieldColumns = [
  { title: '字段', key: 'name', width: 150 },
  { title: '类型', key: 'type', width: 120 },
  {
    title: '表单组件', key: 'component', width: 120,
    render: (row: any) => h(NTag, { type: 'success', size: 'small' }, () => row.component),
  },
  { title: '注释', key: 'comment', ellipsis: { tooltip: true } },
]

async function loadTables() {
  tableLoading.value = true
  try {
    const res = await getGeneratorTablesApi()
    tableOptions.value = res.data.list.map((t: any) => ({
      label: `${t.comment} (${t.name})`,
      key: t.table,
    }))
  } finally { tableLoading.value = false }
}

async function handleTableSelect(table: string) {
  previewCode.value = null
  fieldLoading.value = true
  try {
    const res = await getGeneratorFieldsApi(table)
    fields.value = res.data.fields
  } finally { fieldLoading.value = false }
}

async function handlePreview() {
  if (!selectedTable.value) return
  const res = await previewGeneratorApi(selectedTable.value)
  previewCode.value = res.data
  activeTab.value = 'controller'
}

async function handleGenerate() {
  if (!selectedTable.value) return
  const res = await generateCodeApi(selectedTable.value)
  message.success(`生成成功！文件数: ${res.data.files.length}`)
  message.info(res.data.files.join(', '))
}

onMounted(loadTables)
</script>

<style scoped>
.code-block {
  margin: 0;
  padding: 16px;
  font-size: 13px;
  line-height: 1.6;
  font-family: Consolas, Monaco, monospace;
  background: var(--n-color-target);
  border-radius: 4px;
  white-space: pre;
  overflow-x: auto;
}
</style>
