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
            <template #trigger><n-button type="error" :disabled="!checkedIds.length">批量删除</n-button></template>
            确定要删除选中的 {{ checkedIds.length }} 条记录吗？
          </n-popconfirm>
          <n-popconfirm @positive-click="handleBatchRollback">
            <template #trigger><n-button type="warning" :disabled="!checkedIds.length">批量回滚</n-button></template>
            确定要回滚选中的 {{ checkedIds.length }} 条数据吗？
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

    <n-modal v-model:show="showDetail" preset="card" title="修改详情" style="max-width: 720px">
      <div v-if="detail" class="detail-grid">
        <div class="detail-item"><span class="detail-label">记录ID</span><span>{{ detail.id }}</span></div>
        <div class="detail-item"><span class="detail-label">管理员</span><span>{{ detail.nickname || '-' }}</span></div>
        <div class="detail-item"><span class="detail-label">规则名称</span><span>{{ detail.rule_name || '-' }}</span></div>
        <div class="detail-item"><span class="detail-label">控制器</span><span>{{ detail.controller || '-' }}</span></div>
        <div class="detail-item"><span class="detail-label">连接ID</span><span>{{ detail.connect_id || '-' }}</span></div>
        <div class="detail-item"><span class="detail-label">数据表</span><span>{{ detail.table_name || '-' }}</span></div>
        <div class="detail-item"><span class="detail-label">行ID</span><span>{{ detail.row_id || '-' }}</span></div>
        <div class="detail-item"><span class="detail-label">主键字段</span><span>{{ detail.primary_key || '-' }}</span></div>
        <div class="detail-item"><span class="detail-label">修改字段</span><span>{{ detail.field_name || '-' }}</span></div>
        <div class="detail-item"><span class="detail-label">修改前</span><span class="val-before">{{ detail.before_value || '-' }}</span></div>
        <div class="detail-item"><span class="detail-label">修改后</span><span class="val-after">{{ detail.after_value || '-' }}</span></div>
        <div class="detail-item"><span class="detail-label">IP</span><span>{{ detail.ip || '-' }}</span></div>
        <div class="detail-item"><span class="detail-label">时间</span><span>{{ detail.create_time ? new Date(detail.create_time * 1000).toLocaleString() : '-' }}</span></div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { NButton, NSpace, NTag, NPopconfirm, NInput, NIcon, useMessage } from 'naive-ui'
import { RefreshOutline, SearchOutline } from '@vicons/ionicons5'
import { getSensitiveLogListApi, getSensitiveLogDetailApi, deleteSensitiveLogApi, batchDeleteSensitiveLogApi, rollbackSensitiveLogApi, batchRollbackSensitiveLogApi } from '@/api/sensitive-log'

const message = useMessage()
const loading = ref(false)
const tableData = ref<any[]>([])
const showDetail = ref(false)
const detail = ref<any>(null)
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
  { title: '数据表', key: 'table_name', width: 130, render: (row: any) => h(NTag, { type: 'info', size: 'small' }, () => row.table_name || '-') },
  { title: '行ID', key: 'row_id', width: 70 },
  { title: '字段', key: 'field_name', width: 100 },
  { title: '修改前', key: 'before_value', width: 130, ellipsis: { tooltip: true }, render: (row: any) => (row.before_value || '').substring(0, 50) || '-' },
  { title: '修改后', key: 'after_value', width: 130, ellipsis: { tooltip: true }, render: (row: any) => (row.after_value || '').substring(0, 50) || '-' },
  { title: 'IP', key: 'ip', width: 120 },
  { title: '修改时间', key: 'create_time', width: 170, render: (row: any) => row.create_time ? new Date(row.create_time * 1000).toLocaleString() : '-' },
  {
    title: '操作', key: 'actions', width: 200, fixed: 'right' as const,
    render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', type: 'primary', onClick: () => viewDetail(row.id) }, () => '详情'),
      h(NPopconfirm, { onPositiveClick: () => handleRollback(row.id) }, {
        trigger: () => h(NButton, { size: 'small', type: 'warning' }, () => '回滚'),
        default: () => '确定回滚？',
      }),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row.id) }, {
        trigger: () => h(NButton, { size: 'small', type: 'error' }, () => '删除'),
        default: () => '确定删除？',
      }),
    ]),
  },
]

async function fetchData(page = pagination.page) {
  pagination.page = page; loading.value = true
  try {
    const res = await getSensitiveLogListApi({ page, limit: pagination.pageSize, keyword: keyword.value })
    tableData.value = res.data.list; pagination.itemCount = res.data.total; checkedIds.value = []
  } finally { loading.value = false }
}
function onPageChange(page: number) { fetchData(page) }
async function viewDetail(id: number) { const res = await getSensitiveLogDetailApi(id); detail.value = res.data; showDetail.value = true }
async function handleRollback(id: number) { await rollbackSensitiveLogApi(id); message.success('回滚成功'); fetchData() }
async function handleDelete(id: number) { await deleteSensitiveLogApi(id); message.success('删除成功'); fetchData() }
async function handleBatchDelete() { await batchDeleteSensitiveLogApi(checkedIds.value); message.success('批量删除成功'); fetchData() }
async function handleBatchRollback() { await batchRollbackSensitiveLogApi(checkedIds.value); message.success('批量回滚成功'); fetchData() }

onMounted(() => fetchData())
</script>

<style scoped>
.tb-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.detail-item { display: flex; flex-direction: column; gap: 4px; }
.detail-label { font-size: 12px; color: #999; }
.val-before { color: #e6584b; word-break: break-all; }
.val-after { color: #18a058; word-break: break-all; }
</style>
