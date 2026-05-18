<template>
  <div>
    <n-card>
      <div class="tb-toolbar">
        <n-space>
          <n-button @click="fetchData()">
            <template #icon><n-icon><refresh-outline /></n-icon></template>
            刷新
          </n-button>
          <n-popconfirm @positive-click="handleBatchDelete">
            <template #trigger>
              <n-button type="error" :disabled="!checkedIds.length">批量删除</n-button>
            </template>
            确定要删除选中的 {{ checkedIds.length }} 条记录吗？
          </n-popconfirm>
          <n-popconfirm @positive-click="handleBatchRestore">
            <template #trigger>
              <n-button type="primary" :disabled="!checkedIds.length">批量还原</n-button>
            </template>
            确定要还原选中的 {{ checkedIds.length }} 条记录吗？
          </n-popconfirm>
        </n-space>
        <n-input v-model:value="keyword" placeholder="搜索规则名称..." clearable style="width: 240px" @keyup.enter="fetchData()" @clear="fetchData()">
          <template #prefix><n-icon><search-outline /></n-icon></template>
        </n-input>
      </div>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
        :row-key="(row: any) => row.id"
        :checked-row-keys="checkedIds"
        @update:checked-row-keys="(keys: any[]) => checkedIds = keys"
        @update:page="onPageChange"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { NButton, NSpace, NTag, NPopconfirm, NInput, NIcon, useMessage } from 'naive-ui'
import { RefreshOutline, SearchOutline } from '@vicons/ionicons5'
import { getSecurityRecycleListApi, restoreSecurityRecycleApi, deleteSecurityRecycleApi, batchDeleteSecurityRecycleApi, batchRestoreSecurityRecycleApi } from '@/api/security-recycle'

const message = useMessage()
const loading = ref(false)
const tableData = ref<any[]>([])
const checkedIds = ref<number[]>([])
const keyword = ref('')
const pagination = reactive({ page: 1, pageSize: 15, itemCount: 0 })

const columns = [
  { type: 'selection' as const },
  { title: 'ID', key: 'id', width: 60 },
  { title: '管理员', key: 'nickname', width: 100 },
  { title: '规则名称', key: 'rule_name', width: 120 },
  { title: '控制器', key: 'controller', width: 140, ellipsis: { tooltip: true } },
  { title: '连接ID', key: 'connect_id', width: 80 },
  {
    title: '数据表', key: 'table_name', width: 130,
    render: (row: any) => h(NTag, { type: 'info', size: 'small' }, () => row.table_name || '-'),
  },
  {
    title: '删除数据', key: 'data', ellipsis: { tooltip: true }, minWidth: 200,
    render: (row: any) => {
      try {
        const d = JSON.parse(row.data || '{}')
        return Object.keys(d).slice(0, 4).map(k => `${k}: ${d[k]}`).join(' | ') || '-'
      } catch { return (row.data || '').substring(0, 80) || '-' }
    },
  },
  { title: 'IP', key: 'ip', width: 130 },
  {
    title: '删除时间', key: 'create_time', width: 170,
    render: (row: any) => row.create_time ? new Date(row.create_time * 1000).toLocaleString() : '-',
  },
  {
    title: '操作', key: 'actions', width: 140, fixed: 'right' as const,
    render: (row: any) => h(NSpace, null, () => [
      h(NPopconfirm, { onPositiveClick: () => handleRestore(row.id) }, {
        trigger: () => h(NButton, { size: 'small', type: 'primary' }, () => '还原'),
        default: () => '确定还原此数据？',
      }),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row.id) }, {
        trigger: () => h(NButton, { size: 'small', type: 'error' }, () => '删除'),
        default: () => '确定彻底删除？',
      }),
    ]),
  },
]

async function fetchData(page = pagination.page) {
  pagination.page = page
  loading.value = true
  try {
    const res = await getSecurityRecycleListApi({ page, limit: pagination.pageSize, keyword: keyword.value })
    tableData.value = res.data.list
    pagination.itemCount = res.data.total
    checkedIds.value = []
  } finally { loading.value = false }
}
function onPageChange(page: number) { fetchData(page) }
async function handleRestore(id: number) { await restoreSecurityRecycleApi(id); message.success('还原成功'); fetchData() }
async function handleDelete(id: number) { await deleteSecurityRecycleApi(id); message.success('删除成功'); fetchData() }
async function handleBatchDelete() { await batchDeleteSecurityRecycleApi(checkedIds.value); message.success('批量删除成功'); fetchData() }
async function handleBatchRestore() { await batchRestoreSecurityRecycleApi(checkedIds.value); message.success('批量还原成功'); fetchData() }

onMounted(() => fetchData())
</script>

<style scoped>
.tb-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
</style>
