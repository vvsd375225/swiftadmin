<template>
  <div class="page-wrap">
    <n-card title="可视化CRUD代码生成器" :bordered="false">
      <template #header-extra>
        <n-space>
          <n-button @click="showExisting = true">浏览数据表</n-button>
          <n-button type="primary" @click="handlePreview">预览代码</n-button>
          <n-button type="info" @click="handleGenerate" :loading="generating">一键生成</n-button>
        </n-space>
      </template>

      <n-form label-placement="left" label-width="100">
        <n-grid :cols="2" :x-gap="16">
          <n-gi><n-form-item label="数据表名" required><n-input v-model:value="tableName" placeholder="英文名，如 news" /></n-form-item></n-gi>
          <n-gi><n-form-item label="表注释" required><n-input v-model:value="tableComment" placeholder="如 新闻管理" /></n-form-item></n-gi>
        </n-grid>
      </n-form>

      <n-divider>
        字段设计
        <n-button size="small" type="primary" style="margin-left:12px" @click="addField">+ 添加字段</n-button>
      </n-divider>

      <n-data-table :columns="fieldColumns" :data="fields" size="small" :bordered="false" />

      <n-modal v-model:show="showFieldForm" title="编辑字段">
        <n-card style="width:500px">
          <n-form :model="currentField" label-placement="left" label-width="80">
            <n-form-item label="字段名"><n-input v-model:value="currentField.name" placeholder="英文，如 title" /></n-form-item>
            <n-form-item label="类型"><n-select v-model:value="currentField.type" :options="typeOpts" @update:value="onTypeChange" /></n-form-item>
            <n-form-item label="注释"><n-input v-model:value="currentField.comment" placeholder="如 标题" /></n-form-item>
            <n-form-item label="长度" v-if="currentField.type !== 'text'"><n-input v-model:value="currentField.length" placeholder="如 255" /></n-form-item>
            <n-form-item label="默认值"><n-input v-model:value="currentField.default_val" placeholder="可选" /></n-form-item>
            <n-form-item label="可空"><n-switch v-model:value="currentField.nullable" /></n-form-item>
          </n-form>
          <template #footer><n-space justify="end"><n-button @click="showFieldForm = false">取消</n-button><n-button type="primary" @click="confirmField">确定</n-button></n-space></template>
        </n-card>
      </n-modal>
    </n-card>

    <n-modal v-model:show="showPreview" title="代码预览" style="width:950px">
      <n-tabs type="segment" animated>
        <n-tab-pane name="sql" tab="SQL建表">
          <n-code :code="previewData.sql || ''" language="sql" style="max-height:500px;overflow:auto" />
        </n-tab-pane>
        <n-tab-pane name="php" tab="PHP控制器">
          <n-code :code="previewData.controller || ''" language="php" style="max-height:500px;overflow:auto" />
        </n-tab-pane>
        <n-tab-pane name="vue" tab="Vue页面">
          <n-code :code="previewData.vue || ''" language="html" style="max-height:500px;overflow:auto" />
        </n-tab-pane>
      </n-tabs>
    </n-modal>

    <n-modal v-model:show="showResult" title="生成结果">
      <n-card style="width:650px">
        <n-descriptions :column="1" bordered size="small" label-placement="left">
          <n-descriptions-item label="建表SQL">{{ result.sql_status || '-' }}</n-descriptions-item>
          <n-descriptions-item label="PHP控制器">{{ result.ctrl_status || '-' }}</n-descriptions-item>
          <n-descriptions-item label="Vue页面">{{ result.vue_status || '-' }}</n-descriptions-item>
        </n-descriptions>
      </n-card>
    </n-modal>

    <n-modal v-model:show="showExisting" title="现有数据表">
      <n-card style="width:450px">
        <n-data-table :columns="tableColumns" :data="existingTables" size="small" :bordered="false" />
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, reactive } from 'vue'
import { useMessage, NButton, NSpace } from 'naive-ui'
import { getCrudTablesApi, getCrudTypesApi, generateCrudApi, previewCrudApi } from '@/api/crud'

const message = useMessage()
const tableName = ref('')
const tableComment = ref('')
const fields = ref<any[]>([])
const showFieldForm = ref(false)
const showPreview = ref(false)
const showResult = ref(false)
const showExisting = ref(false)
const generating = ref(false)
const previewData = ref<any>({})
const result = ref<any>({})
const existingTables = ref<any[]>([])
const typeOpts = ref<any[]>([])
const editingIndex = ref(-1)
const currentField = reactive({ name: '', type: 'varchar', length: '', comment: '', default_val: '', nullable: false })

const fieldColumns = [
  { title: '字段名', key: 'name', width: 130 },
  { title: '类型', key: 'type', width: 110 },
  { title: '注释', key: 'comment' },
  { title: '可空', key: 'nullable', width: 60, render: (r: any) => r.nullable ? '是' : '否' },
  { title: '操作', key: 'actions', width: 120, render: (r: any, idx: number) =>
    h(NSpace, null, { default: () => [
      h(NButton, { size: 'tiny', onClick: () => editField(idx) }, '编辑'),
      h(NButton, { size: 'tiny', type: 'error', onClick: () => { fields.value.splice(idx, 1) } }, '删除')
    ]})
  }
]

const tableColumns = [
  { title: '数据表', key: 'table' },
  { title: '记录数', key: 'count', width: 90 }
]

function addField() {
  editingIndex.value = -1
  Object.assign(currentField, { name: '', type: 'varchar', length: '255', comment: '', default_val: '', nullable: false })
  showFieldForm.value = true
}

function editField(idx: number) {
  editingIndex.value = idx
  const f = fields.value[idx]
  Object.assign(currentField, { ...f, default_val: f.default || f.default_val || '' })
  showFieldForm.value = true
}

function confirmField() {
  const f: any = {
    name: currentField.name,
    type: currentField.type,
    length: currentField.length || (currentField.type === 'varchar' ? '255' : currentField.type === 'int' ? '11' : ''),
    comment: currentField.comment,
    default: currentField.default_val || '',
    nullable: currentField.nullable
  }
  if (f.name === 'id') { f.pk = true; f.type = 'int'; f.length = '11'; f.nullable = false }
  if (editingIndex.value >= 0) { fields.value[editingIndex.value] = f }
  else { fields.value.push(f) }
  showFieldForm.value = false
}

function onTypeChange(val: string) {
  const map: Record<string, string> = { varchar: '255', int: '11', bigint: '20', decimal: '10,2' }
  currentField.length = map[val] || ''
}

async function handlePreview() {
  if (!tableName.value || fields.value.filter(f => f.name !== 'id').length === 0) {
    message.warning('请输入表名并至少添加一个业务字段')
    return
  }
  try {
    const r = await previewCrudApi({ table: tableName.value, comment: tableComment.value, fields: fields.value })
    previewData.value = r.data; showPreview.value = true
  } catch (e) {}
}

async function handleGenerate() {
  if (!tableName.value || fields.value.filter(f => f.name !== 'id').length === 0) {
    message.warning('请输入表名并至少添加一个业务字段')
    return
  }
  generating.value = true
  try {
    const r = await generateCrudApi({ table: tableName.value, comment: tableComment.value, fields: fields.value })
    result.value = r.data; showResult.value = true
    if (r.data.sql_status === '已执行') message.success('CRUD代码生成成功！')
  } catch (e) {}
  generating.value = false
}

onMounted(async () => {
  fields.value.push({ name: 'id', type: 'int', length: '11', comment: '主键ID', default: '', nullable: false, pk: true })
  try {
    const [t, types] = await Promise.all([getCrudTablesApi(), getCrudTypesApi()])
    existingTables.value = t.data || []
    typeOpts.value = (types.data || []).map((item: any) => ({ label: item.label, value: item.value }))
  } catch (e) {}
})
</script>
