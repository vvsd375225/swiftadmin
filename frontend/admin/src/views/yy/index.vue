<template>
  <div class="page-wrap">
    <n-card title="yy" :bordered="false">
      <template #header-extra>
        <n-button type="primary" @click="openAdd">添加</n-button>
      </template>
      <n-data-table :columns="columns" :data="list" :loading="loading" :pagination="pagination" />
    </n-card>

    <n-modal v-model:show="showForm" :title="isEdit ? '编辑' : '添加'">
      <n-card style="width:600px">
        <n-form :model="form" label-placement="left" label-width="100">

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
import { useMessage, NButton, NSpace } from 'naive-ui'
import { getYyListApi, saveYyApi, updateYyApi, deleteYyApi } from '@/api/yy'

const message = useMessage()
const list = ref<any[]>([])
const loading = ref(false)
const showForm = ref(false)
const isEdit = ref(false)
const editId = ref(0)
const total = ref(0)

const form = reactive({  })
const pagination = reactive({ page: 1, pageSize: 10, onChange: (p: number) => { pagination.page = p; fetchList() }, itemCount: 0 })

const columns = [
,
  { title: '操作', key: 'actions', width: 160, render: (r: any) => h(NSpace, null, {
    default: () => [
      h(NButton, { size: 'small', onClick: () => openEdit(r) }, '编辑'),
      h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(r.id) }, '删除')
    ]
  })}
]

async function fetchList() {
  loading.value = true
  try { const r = await getYyListApi({ page: pagination.page, limit: pagination.pageSize }); list.value = r.data.list; total.value = r.data.total; pagination.itemCount = r.data.total } catch (e) {}
  loading.value = false
}
function openAdd() { isEdit.value = false; Object.assign(form, {  }); showForm.value = true }
function openEdit(r: any) { isEdit.value = true; editId.value = r.id; Object.assign(form, r); showForm.value = true }
async function handleSave() {
  try {
    if (isEdit.value) { await updateYyApi({ id: editId.value, ...form }) }
    else { await saveYyApi(form) }
    message.success(isEdit.value ? '更新成功' : '添加成功'); showForm.value = false; fetchList()
  } catch (e) {}
}
async function handleDelete(id: number) { try { await deleteYyApi(id); message.success('删除成功'); fetchList() } catch (e) {} }
onMounted(() => fetchList())
<\/script>