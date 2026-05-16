<template>
  <div class="page-wrap">
    <n-card title="定时任务管理" :bordered="false">
      <template #header-extra>
        <n-button type="primary" @click="openAdd">添加任务</n-button>
      </template>
      <n-data-table :columns="columns" :data="list" :loading="loading" :pagination="pagination" />
    </n-card>

    <n-modal v-model:show="showForm" :title="isEdit ? '编辑任务' : '添加任务'">
      <n-card style="width:600px">
        <n-form :model="form" label-placement="left" label-width="100">
          <n-form-item label="任务名称"><n-input v-model:value="form.name" /></n-form-item>
          <n-form-item label="执行命令"><n-input v-model:value="form.command" /></n-form-item>
          <n-form-item label="Cron表达式"><n-input v-model:value="form.cron_expression" placeholder="如: 0 2 * * *" /></n-form-item>
          <n-form-item label="描述"><n-input v-model:value="form.description" /></n-form-item>
          <n-form-item label="状态"><n-switch v-model:value="form.status" :checked-value="1" :unchecked-value="0" /></n-form-item>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button @click="showForm = false">取消</n-button>
            <n-button type="primary" @click="handleSave">保存</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>

    <n-modal v-model:show="showLogs" title="执行日志" style="width:800px">
      <n-data-table :columns="logColumns" :data="logs" :loading="logLoading" :pagination="logPagination" size="small" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, reactive } from 'vue'
import { useMessage, NButton, NSpace, NSwitch, NTag } from 'naive-ui'
import { getCronListApi, saveCronApi, updateCronApi, deleteCronApi, executeCronApi, getCronLogsApi } from '@/api/cron'

const message = useMessage()
const list = ref<any[]>([])
const loading = ref(false)
const showForm = ref(false)
const showLogs = ref(false)
const isEdit = ref(false)
const editId = ref(0)
const logs = ref<any[]>([])
const logLoading = ref(false)
const total = ref(0)
const logTotal = ref(0)

const form = reactive({ name: '', command: '', cron_expression: '', description: '', status: 1 })
const pagination = reactive({ page: 1, pageSize: 10, onChange: (p: number) => { pagination.page = p; fetchList() }, itemCount: 0 })
const logPagination = reactive({ page: 1, pageSize: 10, onChange: (p: number) => { logPagination.page = p; fetchLogs(0) }, itemCount: 0 })

const columns = [
  { title: 'ID', key: 'id', width: 70 },
  { title: '任务名称', key: 'name' },
  { title: '执行命令', key: 'command', ellipsis: { tooltip: true } },
  { title: 'Cron', key: 'cron_expression', width: 120 },
  { title: '状态', key: 'status', width: 80, render: (r: any) => r.status == 1 ? h(NTag, { type: 'success', size: 'small' }, '启用') : h(NTag, { type: 'default', size: 'small' }, '禁用') },
  { title: '执行次数', key: 'run_count', width: 80 },
  { title: '上次执行', key: 'last_run_time', width: 160 },
  { title: '操作', key: 'actions', width: 240, render: (r: any) => h(NSpace, null, {
      default: () => [
        h(NButton, { size: 'small', onClick: () => openEdit(r) }, '编辑'),
        h(NButton, { size: 'small', type: 'info', onClick: () => runJob(r.id) }, '执行'),
        h(NButton, { size: 'small', onClick: () => fetchLogs(r.id) }, '日志'),
        h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(r.id) }, '删除')
      ]
    })
  }
]
const logColumns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '状态', key: 'status', width: 70, render: (r: any) => r.status == 1 ? h(NTag, { type: 'success', size: 'small' }, '成功') : h(NTag, { type: 'error', size: 'small' }, '失败') },
  { title: '耗时(秒)', key: 'duration', width: 90 },
  { title: '时间', key: 'create_time', width: 170 },
  { title: '输出', key: 'output', ellipsis: { tooltip: true } }
]

async function fetchList() {
  loading.value = true
  try {
    const r = await getCronListApi({ page: pagination.page, limit: pagination.pageSize })
    list.value = r.data.list; total.value = r.data.total; pagination.itemCount = r.data.total
  } catch (e) {}
  loading.value = false
}
async function fetchLogs(id: number) {
  if (id) { showLogs.value = true; logPagination.page = 1 }
  logLoading.value = true
  try {
    const r = await getCronLogsApi({ page: id ? logPagination.page : logPagination.page, limit: logPagination.pageSize, id: id || undefined })
    logs.value = r.data.list; logTotal.value = r.data.total; logPagination.itemCount = r.data.total
  } catch (e) {}
  logLoading.value = false
}
function openAdd() { isEdit.value = false; Object.assign(form, { name: '', command: '', cron_expression: '', description: '', status: 1 }); showForm.value = true }
function openEdit(r: any) { isEdit.value = true; editId.value = r.id; Object.assign(form, r); showForm.value = true }
async function handleSave() {
  try {
    if (isEdit.value) { await updateCronApi({ id: editId.value, ...form }) }
    else { await saveCronApi(form) }
    message.success(isEdit.value ? '更新成功' : '添加成功'); showForm.value = false; fetchList()
  } catch (e) {}
}
async function handleDelete(id: number) {
  try { await deleteCronApi(id); message.success('删除成功'); fetchList() } catch (e) {}
}
async function runJob(id: number) {
  try { const r = await executeCronApi(id); message.success('执行成功') } catch (e) {}
}
onMounted(() => fetchList())
</script>
