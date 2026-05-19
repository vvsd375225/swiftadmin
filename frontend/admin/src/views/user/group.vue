<template>
  <div>
    <n-card class="mb-4">
      <n-form inline>
        <n-form-item label="关键词">
          <n-input v-model:value="searchForm.keyword" placeholder="搜索分组名称" />
        </n-form-item>
        <n-button type="primary" @click="handleSearch">搜索</n-button>
        <n-button class="ml-2" @click="handleAdd">新增分组</n-button>
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

    <n-modal v-model:show="showModal" :title="modalTitle">
      <n-form ref="formRef" :model="formData" :rules="rules">
        <n-form-item label="名称" path="name">
          <n-input v-model:value="formData.name" placeholder="请输入分组名称" />
        </n-form-item>
        <n-form-item label="描述">
          <n-input v-model:value="formData.description" type="textarea" placeholder="请输入描述" />
        </n-form-item>
        <n-form-item label="权限规则(JSON)">
          <n-input v-model:value="formData.rules" type="textarea" :rows="4" placeholder='{"key":"value"}' />
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
import { getUserGroupListApi, saveUserGroupApi, updateUserGroupApi, deleteUserGroupApi } from '@/api/userGroup'

const message = useMessage()
const loading = ref(false)
const tableData = ref([])
const showModal = ref(false)
const submitLoading = ref(false)
const editId = ref(0)

const searchForm = reactive({ keyword: '' })
const formData = reactive({
  name: '', description: '', rules: '', status: 1,
})
const rules = {
  name: { required: true, message: '请输入分组名称', trigger: 'blur' },
}

const pagination = reactive({ page: 1, pageSize: 15, itemCount: 0 })

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '名称', key: 'name' },
  { title: '描述', key: 'description', ellipsis: { tooltip: true } },
  {
    title: '状态', key: 'status', width: 80,
    render: (row: any) => h(NTag, { type: row.status == 1 ? 'success' : 'error' }, () => row.status == 1 ? '启用' : '禁用'),
  },
  {
    title: '创建时间', key: 'create_time', width: 160,
    render: (row: any) => row.create_time ? new Date(row.create_time * 1000).toLocaleString() : '-',
  },
  {
    title: '操作', key: 'actions', width: 140,
    render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', onClick: () => handleEdit(row) }, () => '编辑'),
      h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(row.id) }, () => '删除'),
    ]),
  },
]

const modalTitle = computed(() => editId.value ? '编辑分组' : '新增分组')

function resetForm() {
  formData.name = ''
  formData.description = ''
  formData.rules = ''
  formData.status = 1
}

async function fetchData() {
  loading.value = true
  try {
    const res = await getUserGroupListApi({ page: pagination.page, limit: pagination.pageSize, keyword: searchForm.keyword })
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

function handleAdd() {
  editId.value = 0
  resetForm()
  showModal.value = true
}

function handleEdit(row: any) {
  editId.value = row.id
  Object.assign(formData, row)
  showModal.value = true
}

async function handleSubmit() {
  submitLoading.value = true
  try {
    if (editId.value) {
      await updateUserGroupApi({ id: editId.value, ...formData })
      message.success('更新成功')
    } else {
      await saveUserGroupApi(formData)
      message.success('添加成功')
    }
    showModal.value = false
    fetchData()
  } finally {
    submitLoading.value = false
  }
}

async function handleDelete(id: number) {
  await deleteUserGroupApi(id)
  message.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>
