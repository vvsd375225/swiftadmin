<template>
  <div>
    <n-card class="mb-4">
      <n-form inline>
        <n-form-item label="关键词">
          <n-input v-model:value="searchForm.keyword" placeholder="搜索用户名/昵称" />
        </n-form-item>
        <n-button type="primary" @click="handleSearch">搜索</n-button>
        <n-button class="ml-2" @click="handleAdd">新增管理员</n-button>
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
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="formData.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="formData.password" type="password" :placeholder="editId ? '不填则不修改' : '请输入密码'" />
        </n-form-item>
        <n-form-item label="昵称" path="nickname">
          <n-input v-model:value="formData.nickname" placeholder="请输入昵称" />
        </n-form-item>
        <n-form-item label="邮箱">
          <n-input v-model:value="formData.email" placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item label="手机号">
          <n-input v-model:value="formData.mobile" placeholder="请输入手机号" />
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
import { getAdminListApi, saveAdminApi, updateAdminApi, deleteAdminApi } from '@/api/admin'

const message = useMessage()
const loading = ref(false)
const tableData = ref([])
const showModal = ref(false)
const submitLoading = ref(false)
const editId = ref(0)

const searchForm = reactive({ keyword: '' })
const formData = reactive({
  username: '', password: '', nickname: '', email: '', mobile: '', status: 1,
})
const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  nickname: { required: true, message: '请输入昵称', trigger: 'blur' },
}

const pagination = reactive({ page: 1, pageSize: 15, itemCount: 0 })

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '用户名', key: 'username' },
  { title: '昵称', key: 'nickname' },
  { title: '邮箱', key: 'email' },
  { title: '手机号', key: 'mobile' },
  {
    title: '状态', key: 'status', width: 80,
    render: (row: any) => h(NTag, { type: row.status == 1 ? 'success' : 'error' }, () => row.status == 1 ? '启用' : '禁用'),
  },
  {
    title: '操作', key: 'actions', width: 160,
    render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', onClick: () => handleEdit(row) }, () => '编辑'),
      h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(row.id) }, () => '删除'),
    ]),
  },
]

const modalTitle = computed(() => editId.value ? '编辑管理员' : '新增管理员')

function resetForm() {
  formData.username = ''
  formData.password = ''
  formData.nickname = ''
  formData.email = ''
  formData.mobile = ''
  formData.status = 1
}

async function fetchData() {
  loading.value = true
  try {
    const res = await getAdminListApi({ page: pagination.page, limit: pagination.pageSize, keyword: searchForm.keyword })
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
  formData.password = ''
  showModal.value = true
}

async function handleSubmit() {
  submitLoading.value = true
  try {
    if (editId.value) {
      await updateAdminApi({ id: editId.value, ...formData })
      message.success('更新成功')
    } else {
      await saveAdminApi(formData)
      message.success('添加成功')
    }
    showModal.value = false
    fetchData()
  } finally {
    submitLoading.value = false
  }
}

async function handleDelete(id: number) {
  if (id === 1) {
    message.warning('超级管理员不可删除')
    return
  }
  await deleteAdminApi(id)
  message.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>
