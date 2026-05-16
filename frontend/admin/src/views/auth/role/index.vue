<template>
  <div>
    <n-card class="mb-4">
      <n-button type="primary" @click="handleAdd">新增角色</n-button>
    </n-card>
    <n-card>
      <n-data-table :columns="columns" :data="tableData" :loading="loading" />
    </n-card>

    <n-modal v-model:show="showModal" :title="modalTitle">
      <n-form ref="formRef" :model="formData">
        <n-form-item label="角色名称" path="name">
          <n-input v-model:value="formData.name" placeholder="请输入角色名称" />
        </n-form-item>
        <n-form-item label="描述">
          <n-input v-model:value="formData.description" placeholder="请输入描述" type="textarea" />
        </n-form-item>
        <n-form-item label="状态">
          <n-switch v-model:value="formData.status" :checked-value="1" :unchecked-value="0" />
        </n-form-item>
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
import { getRoleListApi, saveRoleApi, updateRoleApi, deleteRoleApi } from '@/api/role'

const message = useMessage()
const loading = ref(false)
const tableData = ref([])
const showModal = ref(false)
const submitLoading = ref(false)
const editId = ref(0)
const formData = reactive({ name: '', description: '', status: 1 })

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '名称', key: 'name' },
  { title: '描述', key: 'description' },
  { title: '状态', key: 'status', width: 80, render: (row: any) => h(NTag, { type: row.status == 1 ? 'success' : 'error' }, () => row.status == 1 ? '启用' : '禁用') },
  { title: '操作', key: 'actions', width: 160, render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', onClick: () => handleEdit(row) }, () => '编辑'),
      h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(row.id) }, () => '删除'),
  ]) },
]

const modalTitle = computed(() => editId.value ? '编辑角色' : '新增角色')

async function fetchData() {
  loading.value = true
  try {
    const res = await getRoleListApi()
    tableData.value = res.data.list
  } finally { loading.value = false }
}

function handleAdd() { editId.value = 0; Object.assign(formData, { name: '', description: '', status: 1 }); showModal.value = true }
function handleEdit(row: any) { editId.value = row.id; Object.assign(formData, row); showModal.value = true }

async function handleSubmit() {
  submitLoading.value = true
  try {
    if (editId.value) {
      await updateRoleApi({ id: editId.value, ...formData }); message.success('更新成功')
    } else {
      await saveRoleApi(formData); message.success('添加成功')
    }
    showModal.value = false; fetchData()
  } finally { submitLoading.value = false }
}

async function handleDelete(id: number) {
  if (id === 1) { message.warning('超级管理员角色不可删除'); return }
  await deleteRoleApi(id); message.success('删除成功'); fetchData()
}

onMounted(fetchData)
</script>
