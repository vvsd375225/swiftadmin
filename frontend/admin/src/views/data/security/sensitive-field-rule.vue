<template>
  <div>
    <n-alert type="warning" :bordered="false" class="alert-banner">
      敏感字段规则用于监控和记录敏感数据的修改操作，配置后系统会自动记录对应表中敏感字段的变更历史。
    </n-alert>

    <n-card>
      <div class="tb-toolbar">
        <n-space>
          <n-button @click="fetchData()">
            <template #icon><n-icon><refresh-outline /></n-icon></template>
            刷新
          </n-button>
          <n-button type="primary" @click="handleAdd">
            <template #icon><n-icon><add-outline /></n-icon></template>
            新增
          </n-button>
          <n-button :disabled="!checkedIds.length || checkedIds.length > 1" @click="handleEdit(checkedIds[0])">
            <template #icon><n-icon><create-outline /></n-icon></template>
            编辑
          </n-button>
          <n-popconfirm @positive-click="handleBatchDelete">
            <template #trigger>
              <n-button type="error" :disabled="!checkedIds.length">删除</n-button>
            </template>
            确定要删除选中的 {{ checkedIds.length }} 条规则吗？
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

    <n-modal v-model:show="showForm" preset="card" :title="editId ? '编辑规则' : '添加规则'" style="max-width: 600px">
      <n-form ref="formRef" :model="form" :rules="rules" label-placement="left" label-width="100">
        <n-form-item label="规则名称" path="name">
          <n-input v-model:value="form.name" placeholder="请输入规则名称" />
        </n-form-item>
        <n-form-item label="控制器" path="controller">
          <n-input v-model:value="form.controller" placeholder="如：app/admin/controller/User" />
        </n-form-item>
        <n-form-item label="连接ID" path="connect_id">
          <n-input-number v-model:value="form.connect_id" :min="0" />
        </n-form-item>
        <n-form-item label="数据表" path="table_name">
          <n-input v-model:value="form.table_name" placeholder="如：swift_user" />
        </n-form-item>
        <n-form-item label="主键字段" path="primary_key">
          <n-input v-model:value="form.primary_key" placeholder="id" />
        </n-form-item>
        <n-form-item label="敏感字段" path="sensitive_fields">
          <n-dynamic-tags v-model:value="sensitiveFieldsTags" />
        </n-form-item>
        <n-form-item label="状态" path="status">
          <n-switch v-model:value="form.status" :checked-value="1" :unchecked-value="0" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showForm = false">取消</n-button>
          <n-button type="primary" :loading="saving" @click="handleSave">保存</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { NButton, NSpace, NTag, NSwitch, NDynamicTags, NPopconfirm, NForm, NFormItem, NInput, NInputNumber, NIcon, useMessage } from 'naive-ui'
import { AddOutline, CreateOutline, RefreshOutline, SearchOutline } from '@vicons/ionicons5'
import { getSensitiveFieldRuleListApi, saveSensitiveFieldRuleApi, updateSensitiveFieldRuleApi, deleteSensitiveFieldRuleApi, toggleSensitiveFieldRuleStatusApi } from '@/api/sensitive-field-rule'

const message = useMessage()
const loading = ref(false)
const saving = ref(false)
const tableData = ref<any[]>([])
const showForm = ref(false)
const editId = ref(0)
const formRef = ref()
const checkedIds = ref<number[]>([])
const keyword = ref('')
const form = reactive({ name: '', controller: '', connect_id: 0, table_name: '', primary_key: 'id', status: 1 })
const sensitiveFieldsTags = ref<string[]>([])
const rules = {
  name: { required: true, message: '请输入规则名称', trigger: 'blur' },
  controller: { required: true, message: '请输入控制器', trigger: 'blur' },
  table_name: { required: true, message: '请输入数据表名', trigger: 'blur' },
}
const pagination = reactive({ page: 1, pageSize: 15, itemCount: 0 })

const columns = [
  { type: 'selection' as const },
  { title: 'ID', key: 'id', width: 60 },
  { title: '规则名称', key: 'name', width: 140 },
  { title: '控制器', key: 'controller', width: 170, ellipsis: { tooltip: true } },
  { title: '连接ID', key: 'connect_id', width: 80 },
  { title: '数据表', key: 'table_name', width: 150, render: (row: any) => h(NTag, { type: 'info', size: 'small' }, () => row.table_name || '-') },
  { title: '主键', key: 'primary_key', width: 80 },
  {
    title: '敏感字段', key: 'sensitive_fields', minWidth: 200,
    render: (row: any) => {
      try {
        const fields = JSON.parse(row.sensitive_fields || '[]')
        return h(NSpace, { size: 4 }, () => fields.map((f: string) => h(NTag, { type: 'warning', size: 'small' }, () => f)))
      } catch { return row.sensitive_fields || '-' }
    },
  },
  {
    title: '状态', key: 'status', width: 110,
    render: (row: any) => row.status === 1
      ? h(NTag, { type: 'success', size: 'small' }, () => '修改监控中')
      : h(NTag, { type: 'default', size: 'small' }, () => '已禁用'),
  },
  { title: '更新时间', key: 'update_time', width: 170, render: (row: any) => row.update_time ? new Date(row.update_time * 1000).toLocaleString() : '-' },
  { title: '创建时间', key: 'create_time', width: 170, render: (row: any) => row.create_time ? new Date(row.create_time * 1000).toLocaleString() : '-' },
  {
    title: '操作', key: 'actions', width: 180, fixed: 'right' as const,
    render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', type: 'primary', onClick: () => handleEdit(row.id) }, () => '编辑'),
      h(NButton, { size: 'small', secondary: true, onClick: () => handleToggle(row.id, row.status) }, () => row.status === 1 ? '禁用' : '启用'),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row.id) }, {
        trigger: () => h(NButton, { size: 'small', type: 'error' }, () => '删除'),
        default: () => '确定删除此规则？',
      }),
    ]),
  },
]

async function fetchData(page = pagination.page) {
  pagination.page = page; loading.value = true
  try {
    const res = await getSensitiveFieldRuleListApi({ page, limit: pagination.pageSize, keyword: keyword.value })
    tableData.value = res.data.list; pagination.itemCount = res.data.total; checkedIds.value = []
  } finally { loading.value = false }
}
function onPageChange(page: number) { fetchData(page) }
function resetForm() { form.name = ''; form.controller = ''; form.connect_id = 0; form.table_name = ''; form.primary_key = 'id'; form.status = 1; sensitiveFieldsTags.value = [] }
function handleAdd() { resetForm(); editId.value = 0; showForm.value = true }
function handleEdit(id: number) {
  const row = tableData.value.find(r => r.id === id)
  if (!row) return
  editId.value = row.id
  form.name = row.name; form.controller = row.controller; form.connect_id = row.connect_id
  form.table_name = row.table_name; form.primary_key = row.primary_key; form.status = row.status
  try { sensitiveFieldsTags.value = JSON.parse(row.sensitive_fields || '[]') } catch { sensitiveFieldsTags.value = [] }
  showForm.value = true
}
async function handleSave() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  saving.value = true
  try {
    const payload = { ...form, sensitive_fields: JSON.stringify(sensitiveFieldsTags.value) }
    if (editId.value) { await updateSensitiveFieldRuleApi({ id: editId.value, ...payload }); message.success('更新成功') }
    else { await saveSensitiveFieldRuleApi(payload); message.success('添加成功') }
    showForm.value = false; fetchData()
  } finally { saving.value = false }
}
async function handleToggle(id: number, currentStatus: number) { await toggleSensitiveFieldRuleStatusApi(id); message.success(currentStatus === 1 ? '已禁用' : '已启用'); fetchData() }
async function handleDelete(id: number) { await deleteSensitiveFieldRuleApi(id); message.success('删除成功'); fetchData() }
async function handleBatchDelete() { for (const id of checkedIds.value) { await deleteSensitiveFieldRuleApi(id) }; message.success('批量删除成功'); fetchData() }

onMounted(() => fetchData())
</script>

<style scoped>
.alert-banner { margin-bottom: 12px; }
.tb-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
</style>
