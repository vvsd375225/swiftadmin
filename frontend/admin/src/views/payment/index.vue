<template>
  <div class="page-wrap">
    <n-card title="支付管理" :bordered="false">
      <template #header-extra>
        <n-space>
          <n-button type="info" @click="fetchSummary">统计</n-button>
          <n-button type="primary" @click="openAdd">创建支付单</n-button>
        </n-space>
      </template>
      <n-data-table :columns="columns" :data="list" :loading="loading" :pagination="pagination" />
    </n-card>

    <n-modal v-model:show="showSummary" title="支付统计">
      <n-card style="width:500px">
        <n-descriptions v-if="summary" :column="2" bordered>
          <n-descriptions-item label="总订单数">{{ summary.total_count }}</n-descriptions-item>
          <n-descriptions-item label="总金额">{{ summary.total_amount }}</n-descriptions-item>
          <n-descriptions-item label="已支付">{{ summary.paid_count }}</n-descriptions-item>
          <n-descriptions-item label="已退款">{{ summary.refund_count }}</n-descriptions-item>
          <n-descriptions-item label="退款金额">{{ summary.refund_amount }}</n-descriptions-item>
          <n-descriptions-item label="微信支付">{{ summary.wechat_count }}</n-descriptions-item>
          <n-descriptions-item label="支付宝">{{ summary.alipay_count }}</n-descriptions-item>
        </n-descriptions>
      </n-card>
    </n-modal>

    <n-modal v-model:show="showForm" :title="isEdit ? '编辑支付单' : '创建支付单'">
      <n-card style="width:600px">
        <n-form :model="form" label-placement="left" label-width="100">
          <n-form-item label="订单标题"><n-input v-model:value="form.title" /></n-form-item>
          <n-form-item label="金额"><n-input-number v-model:value="form.amount" /></n-form-item>
          <n-form-item label="支付渠道">
            <n-select v-model:value="form.channel" :options="[{ label: '微信支付', value: 'wechat' }, { label: '支付宝', value: 'alipay' }]" />
          </n-form-item>
          <n-form-item label="状态">
            <n-select v-model:value="form.status" :options="[{ label: '待支付', value: 0 }, { label: '支付中', value: 1 }, { label: '已支付', value: 2 }, { label: '已退款', value: 3 }]" />
          </n-form-item>
          <n-form-item label="付款人"><n-input v-model:value="form.buyer" /></n-form-item>
          <n-form-item label="备注"><n-input v-model:value="form.remark" /></n-form-item>
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
import { getPaymentListApi, savePaymentApi, updatePaymentApi, deletePaymentApi, refundPaymentApi, getPaymentSummaryApi } from '@/api/payment'

const message = useMessage()
const list = ref<any[]>([])
const loading = ref(false)
const showForm = ref(false)
const showSummary = ref(false)
const isEdit = ref(false)
const editId = ref(0)
const total = ref(0)
const summary = ref<any>(null)

const form = reactive({ title: '', amount: 0, channel: 'wechat', status: 0, buyer: '', remark: '' })
const pagination = reactive({ page: 1, pageSize: 10, onChange: (p: number) => { pagination.page = p; fetchList() }, itemCount: 0 })

const statusMap: any = { 0: '待支付', 1: '支付中', 2: '已支付', 3: '已退款' }
const statusType: any = { 0: 'default', 1: 'info', 2: 'success', 3: 'warning' }

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '订单号', key: 'order_no', width: 180 },
  { title: '标题', key: 'title', ellipsis: { tooltip: true } },
  { title: '金额', key: 'amount', width: 100 },
  { title: '渠道', key: 'channel', width: 100 },
  { title: '状态', key: 'status', width: 90, render: (r: any) => h(NTag, { type: statusType[r.status] || 'default', size: 'small' }, statusMap[r.status]) },
  { title: '付款人', key: 'buyer', width: 100 },
  { title: '时间', key: 'create_time', width: 170 },
  { title: '操作', key: 'actions', width: 200, render: (r: any) => h(NSpace, null, {
      default: () => [
        h(NButton, { size: 'small', onClick: () => openEdit(r) }, '编辑'),
        r.status == 2 ? h(NButton, { size: 'small', type: 'warning', onClick: () => handleRefund(r.id) }, '退款') : null,
        h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(r.id) }, '删除')
      ]
    })
  }
]

async function fetchList() {
  loading.value = true
  try {
    const r = await getPaymentListApi({ page: pagination.page, limit: pagination.pageSize })
    list.value = r.data.list; total.value = r.data.total; pagination.itemCount = r.data.total
  } catch (e) {}
  loading.value = false
}
async function fetchSummary() {
  try { const r = await getPaymentSummaryApi(); summary.value = r.data; showSummary.value = true } catch (e) {}
}
function openAdd() { isEdit.value = false; Object.assign(form, { title: '', amount: 0, channel: 'wechat', status: 0, buyer: '', remark: '' }); showForm.value = true }
function openEdit(r: any) { isEdit.value = true; editId.value = r.id; Object.assign(form, r); showForm.value = true }
async function handleSave() {
  try {
    if (isEdit.value) { await updatePaymentApi({ id: editId.value, ...form }) }
    else { await savePaymentApi(form) }
    message.success(isEdit.value ? '更新成功' : '添加成功'); showForm.value = false; fetchList()
  } catch (e) {}
}
async function handleDelete(id: number) {
  try { await deletePaymentApi(id); message.success('删除成功'); fetchList() } catch (e) {}
}
async function handleRefund(id: number) {
  try { await refundPaymentApi(id); message.success('退款成功'); fetchList() } catch (e) {}
}
onMounted(() => fetchList())
</script>
