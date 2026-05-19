<template>
  <div>
    <n-card class="mb-4">
      <n-button type="primary" @click="handleAdd(0)">新增菜单</n-button>
    </n-card>
    <n-card>
      <n-data-table :columns="columns" :data="tableData" :loading="loading" :row-key="(row: any) => row.id" />
    </n-card>

    <n-modal v-model:show="showModal" :title="modalTitle">
      <n-form ref="formRef" :model="formData">
        <n-form-item label="父级"><n-input-number v-model:value="formData.parent_id" /></n-form-item>
        <n-form-item label="名称" path="name"><n-input v-model:value="formData.name" /></n-form-item>
        <n-form-item label="标题" path="title"><n-input v-model:value="formData.title" /></n-form-item>
        <n-form-item label="图标"><n-input v-model:value="formData.icon" /></n-form-item>
        <n-form-item label="路径"><n-input v-model:value="formData.path" /></n-form-item>
        <n-form-item label="组件"><n-input v-model:value="formData.component" /></n-form-item>
        <n-form-item label="类型"><n-select v-model:value="formData.type" :options="typeOpts" /></n-form-item>
        <n-form-item label="权限标识"><n-input v-model:value="formData.permission" /></n-form-item>
        <n-form-item label="排序"><n-input-number v-model:value="formData.sort" /></n-form-item>
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
import { NButton, NSpace, NTag, useMessage } from 'naive-ui'
import { getMenuListApi, saveMenuApi, updateMenuApi, deleteMenuApi } from '@/api/menu'

const message = useMessage()
const loading = ref(false)
const tableData = ref([])
const showModal = ref(false)
const submitLoading = ref(false)
const editId = ref(0)
const typeOpts = [{ label: '目录', value: 1 }, { label: '菜单', value: 2 }, { label: '按钮', value: 3 }]

const formData = reactive({
  parent_id: 0, name: '', title: '', icon: '', path: '', component: '', type: 1, permission: '', sort: 0,
})

const columns = [
  { title: 'ID', key: 'id', width: 50 },
  { title: '标题', key: 'title' },
  { title: '名称', key: 'name' },
  { title: '路径', key: 'path' },
  { title: '类型', key: 'type', width: 70, render: (r: any) => h(NTag, null, () => ['', '目录', '菜单', '按钮'][r.type]) },
  { title: '排序', key: 'sort', width: 60 },
  { title: '操作', key: 'actions', width: 160, render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', onClick: () => handleAdd(row.id) }, () => '添加子'),
      h(NButton, { size: 'small', onClick: () => handleEdit(row) }, () => '编辑'),
      h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(row.id) }, () => '删除'),
  ]) },
]

const modalTitle = computed(() => editId.value ? '编辑菜单' : '新增菜单')

function flattenTree(tree: any[], depth: number = 0): any[] {
  let result: any[] = []
  for (const item of tree) {
    result.push({ ...item, title: '--'.repeat(depth) + ' ' + item.title })
    if (item.children) result = result.concat(flattenTree(item.children, depth + 1))
  }
  return result
}

async function fetchData() {
  loading.value = true
  try {
    const res = await getMenuListApi()
    tableData.value = flattenTree(res.data.list)
  } finally { loading.value = false }
}

function resetForm() {
  formData.parent_id = 0; formData.name = ''; formData.title = ''; formData.icon = ''
  formData.path = ''; formData.component = ''; formData.type = 1; formData.permission = ''; formData.sort = 0
}

function handleAdd(pid: number) { editId.value = 0; resetForm(); formData.parent_id = pid; showModal.value = true }
function handleEdit(row: any) { editId.value = row.id; Object.assign(formData, row); showModal.value = true }

async function handleSubmit() {
  submitLoading.value = true
  try {
    if (editId.value) { await updateMenuApi({ id: editId.value, ...formData }); message.success('更新成功') }
    else { await saveMenuApi(formData); message.success('添加成功') }
    showModal.value = false; fetchData()
  } finally { submitLoading.value = false }
}

async function handleDelete(id: number) {
  await deleteMenuApi(id); message.success('删除成功'); fetchData()
}

onMounted(fetchData)
</script>
