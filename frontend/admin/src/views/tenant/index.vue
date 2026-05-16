<template>
  <div class="page-wrap">
    <n-card title="租户管理" :bordered="false">
      <template #header-extra>
        <n-button type="primary" @click="openAdd">添加租户</n-button>
      </template>
      <n-data-table :columns="columns" :data="list" :loading="loading" :pagination="pagination" />
    </n-card>

    <n-modal v-model:show="showForm" :title="isEdit ? '编辑租户' : '添加租户'">
      <n-card style="width:600px">
        <n-form :model="form" label-placement="left" label-width="100">
          <n-form-item label="租户名称"><n-input v-model:value="form.name" /></n-form-item>
          <n-form-item label="域名"><n-input v-model:value="form.domain" /></n-form-item>
          <n-form-item label="套餐">
            <n-select v-model:value="form.package_id" :options="planOpts" />
          </n-form-item>
          <n-form-item label="到期时间"><n-input v-model:value="form.expire_time" placeholder="如: 2026-12-31" /></n-form-item>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, reactive } from 'vue'
import { useMessage, NButton, NSpace, NTag } from 'naive-ui'
import { getTenantListApi, saveTenantApi, updateTenantApi, deleteTenantApi, getPlansApi } from '@/api/tenant'

const message = useMessage()
const list = ref<any[]>([])
const loading = ref(false)
const showForm = ref(false)
const isEdit = ref(false)
const editId = ref(0)
const total = ref(0)
const planOpts = ref<any[]>([])

const form = reactive({ name: '', domain: '', package_id: 1, expire_time: '', status: 1 })
const pagination = reactive({ page: 1, pageSize: 10, onChange: (p: number) => { pagination.page = p; fetchList() }, itemCount: 0 })

const columns = [
  { title: 'ID', key: 'id', width: 70 },
  { title: '租户名称', key: 'name' },
  { title: '域名', key: 'domain' },
  { title: '套餐', key: 'package_id', width: 100 },
  { title: '状态', key: 'status', width: 80, render: (r: any) => r.status == 1 ? h(NTag, { type: 'success', size: 'small' }, '启用') : h(NTag, { type: 'default', size: 'small' }, '禁用') },
  { title: '到期时间', key: 'expire_time', width: 170 },
  { title: '创建时间', key: 'create_time', width: 170 },
  { title: '操作', key: 'actions', width: 160, render: (r: any) => h(NSpace, null, {
      default: () => [
        h(NButton, { size: 'small', onClick: () => openEdit(r) }, '编辑'),
        h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(r.id) }, '删除')
      ]
    })
  }
]

async function fetchList() {
  loading.value = true
  try {
    const r = await getTenantListApi({ page: pagination.page, limit: pagination.pageSize })
    list.value = r.data.list; total.value = r.data.total; pagination.itemCount = r.data.total
    list.value.forEach((v: any) => { if (v.package_id) v.package_id = '套餐' + v.package_id })
  } catch (e) {}
  loading.value = false
}
async function fetchPlans() {
  try { const r = await getPlansApi(); planOpts.value = r.data.map((p: any) => ({ label: p.name, value: p.id })) } catch (e) {}
}
function openAdd() { isEdit.value = false; Object.assign(form, { name: '', domain: '', package_id: 1, expire_time: '', status: 1 }); showForm.value = true }
function openEdit(r: any) { isEdit.value = true; editId.value = r.id; Object.assign(form, r); showForm.value = true }
async function handleSave() {
  try {
    if (isEdit.value) { await updateTenantApi({ id: editId.value, ...form }) }
    else { await saveTenantApi(form) }
    message.success(isEdit.value ? '更新成功' : '添加成功'); showForm.value = false; fetchList()
  } catch (e) {}
}
async function handleDelete(id: number) {
  try { await deleteTenantApi(id); message.success('删除成功'); fetchList() } catch (e) {}
}
onMounted(() => { fetchList(); fetchPlans() })
</script>
