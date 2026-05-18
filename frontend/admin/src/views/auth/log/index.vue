<template>
  <div>
    <n-card class="mb-4">
      <n-form inline>
        <n-form-item label="关键词">
          <n-input v-model:value="searchForm.keyword" placeholder="搜索用户名/标题/URL" />
        </n-form-item>
        <n-button type="primary" @click="handleSearch">搜索</n-button>
      </n-form>
    </n-card>

    <n-card>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
        @update:page="handlePageChange"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { NButton, NSpace, NTag, useMessage } from 'naive-ui'
import { getLogListApi, deleteLogApi } from '@/api/log'

const message = useMessage()
const loading = ref(false)
const tableData = ref([])

const searchForm = reactive({ keyword: '' })
const pagination = reactive({ page: 1, pageSize: 15, itemCount: 0 })

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '操作标题', key: 'title', width: 150 },
  { title: '请求URL', key: 'url', width: 200, ellipsis: { tooltip: true } },
  {
    title: '方法', key: 'method', width: 70,
    render: (row: any) => h(NTag, { type: row.method === 'POST' ? 'info' : row.method === 'DELETE' ? 'error' : 'default', size: 'small' }, () => row.method),
  },
  { title: '管理员', key: 'username', width: 100 },
  { title: 'IP', key: 'ip', width: 130 },
  {
    title: '状态', key: 'status', width: 70,
    render: (row: any) => h(NTag, { type: row.status == 1 ? 'success' : 'error' }, () => row.status == 1 ? '成功' : '失败'),
  },
  { title: '耗时(s)', key: 'time_cost', width: 80 },
  {
    title: '操作时间', key: 'create_time', width: 160,
    render: (row: any) => row.create_time ? new Date(row.create_time * 1000).toLocaleString() : '-',
  },
  {
    title: '操作', key: 'actions', width: 100,
    render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(row.id) }, () => '删除'),
    ]),
  },
]

async function fetchData() {
  loading.value = true
  try {
    const res = await getLogListApi({ page: pagination.page, limit: pagination.pageSize, keyword: searchForm.keyword })
    tableData.value = res.data.list
    pagination.itemCount = res.data.total
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  pagination.page = 1
  fetchData()
}

function handlePageChange(page: number) {
  pagination.page = page
  fetchData()
}

async function handleDelete(id: number) {
  await deleteLogApi(id)
  message.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>
