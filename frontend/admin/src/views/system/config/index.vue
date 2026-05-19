<template>
  <div>
    <n-card class="mb-4">
      <n-button type="primary" @click="handleAdd">新增配置</n-button>
    </n-card>
    <n-card>
      <n-data-table :columns="columns" :data="tableData" :loading="loading" />
    </n-card>

    <n-modal v-model:show="showModal" :title="modalTitle">
      <n-form ref="formRef" :model="formData">
        <n-form-item label="配置名" path="name"><n-input v-model:value="formData.name" /></n-form-item>
        <n-form-item label="分组"><n-input v-model:value="formData.group" /></n-form-item>
        <n-form-item label="值"><n-input v-model:value="formData.value" /></n-form-item>
        <n-form-item label="类型"><n-input v-model:value="formData.type" /></n-form-item>
        <n-form-item label="说明"><n-input v-model:value="formData.description" type="textarea" /></n-form-item>
      </n-form>
      <template #action>
        <n-button @click="showModal = false">取消</n-button>
        <n-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, h } from 'vue'
import { NButton, NSpace, useMessage } from 'naive-ui'
import { getConfigListApi, saveConfigApi, updateConfigApi, deleteConfigApi } from '@/api/config'

const message = useMessage()
const loading = ref(false); const tableData = ref([]); const showModal = ref(false)
const submitLoading = ref(false); const editId = ref(0)
const formData = reactive({ name: '', group: 'site', value: '', type: 'string', description: '' })

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '配置名', key: 'name' }, { title: '分组', key: 'group' },
  { title: '值', key: 'value', ellipsis: { tooltip: true } }, { title: '类型', key: 'type' },
  { title: '说明', key: 'description' },
  { title: '操作', key: 'actions', width: 160, render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', onClick: () => handleEdit(row) }, () => '编辑'),
      h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(row.id) }, () => '删除'),
  ]) },
]

const modalTitle = computed(() => editId.value ? '编辑配置' : '新增配置')

function resetForm() { formData.name = ''; formData.group = 'site'; formData.value = ''; formData.type = 'string'; formData.description = '' }
async function fetchData() { loading.value = true; try { const res = await getConfigListApi(); tableData.value = res.data.list } finally { loading.value = false } }
function handleAdd() { editId.value = 0; resetForm(); showModal.value = true }
function handleEdit(row: any) { editId.value = row.id; Object.assign(formData, row); showModal.value = true }
async function handleSubmit() {
  submitLoading.value = true
  try { if (editId.value) { await updateConfigApi({ id: editId.value, ...formData }); message.success('更新成功') } else { await saveConfigApi(formData); message.success('添加成功') }; showModal.value = false; fetchData() } finally { submitLoading.value = false }
}
async function handleDelete(id: number) { await deleteConfigApi(id); message.success('删除成功'); fetchData() }
onMounted(fetchData)
</script>
