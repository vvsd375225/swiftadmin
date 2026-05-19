<template>
  <div>
    <n-card>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
        @update:page="handlePageChange"
      />
    </n-card>

    <!-- 恢复确认弹窗 -->
    <n-modal v-model:show="showRestore" preset="dialog" title="确认恢复">
      <div>确定要恢复此数据吗？数据将还原到原表中。</div>
      <template #action>
        <n-button @click="showRestore = false">取消</n-button>
        <n-button type="primary" :loading="restoring" @click="confirmRestore">确定恢复</n-button>
      </template>
    </n-modal>

    <!-- 彻底删除确认弹窗 -->
    <n-modal v-model:show="showDelete" preset="dialog" title="确认删除" type="error">
      <div>确定要彻底删除此数据吗？此操作不可恢复！</div>
      <template #action>
        <n-button @click="showDelete = false">取消</n-button>
        <n-button type="error" :loading="deleting" @click="confirmDelete">彻底删除</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { NButton, NSpace, NTag, useMessage } from 'naive-ui'
import { getRecycleListApi, restoreRecycleApi, deleteRecycleApi } from '@/api/recycle'

const message = useMessage()
const loading = ref(false)
const tableData = ref<any[]>([])
const showRestore = ref(false)
const showDelete = ref(false)
const restoring = ref(false)
const deleting = ref(false)
const currentId = ref(0)

const pagination = reactive({ page: 1, pageSize: 15, itemCount: 0 })

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  {
    title: '原表', key: 'table_name', width: 160,
    render: (row: any) => h(NTag, { type: 'info' }, () => row.table_name),
  },
  { title: '数据ID', key: 'data_id', width: 80 },
  {
    title: '删除数据', key: 'data', ellipsis: { tooltip: true },
    render: (row: any) => {
      try {
        const d = JSON.parse(row.data || '{}')
        return Object.values(d).slice(0, 3).join(' | ')
      } catch {
        return row.data?.substring(0, 60) || '-'
      }
    },
  },
  {
    title: '删除时间', key: 'create_time', width: 180,
    render: (row: any) => row.create_time ? new Date(row.create_time * 1000).toLocaleString() : '-',
  },
  {
    title: '操作', key: 'actions', width: 200,
    render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', type: 'primary', onClick: () => handleRestore(row.id) }, () => '恢复'),
      h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(row.id) }, () => '彻底删除'),
    ]),
  },
]

async function fetchData() {
  loading.value = true
  try {
    const res = await getRecycleListApi({ page: pagination.page, limit: pagination.pageSize })
    tableData.value = res.data.list
    pagination.itemCount = res.data.total
  } finally {
    loading.value = false
  }
}

function handlePageChange(page: number) {
  pagination.page = page
  fetchData()
}

function handleRestore(id: number) {
  currentId.value = id
  showRestore.value = true
}

async function confirmRestore() {
  restoring.value = true
  try {
    await restoreRecycleApi(currentId.value)
    message.success('恢复成功')
    showRestore.value = false
    fetchData()
  } finally {
    restoring.value = false
  }
}

function handleDelete(id: number) {
  currentId.value = id
  showDelete.value = true
}

async function confirmDelete() {
  deleting.value = true
  try {
    await deleteRecycleApi(currentId.value)
    message.success('已彻底删除')
    showDelete.value = false
    fetchData()
  } finally {
    deleting.value = false
  }
}

onMounted(fetchData)
</script>
