<template>
  <n-card title="栏目管理" :bordered="false">
    <template #header-extra><n-button type="primary" size="small" @click="openAdd()">新增栏目</n-button></template>
    <div style="display:flex;gap:16px">
      <n-card size="small" title="栏目树" style="width:300px;flex-shrink:0">
        <n-tree :data="treeData" node-key="id" key-field="id" label-field="name" children-field="children"
          :selected-keys="selectedKeys" @update:selected-keys="onSelect" block-line expand-on-click />
      </n-card>
      <n-card size="small" title="栏目列表" style="flex:1">
        <n-data-table :columns="cols" :data="list" :loading="loading" :pagination="false" size="small" />
      </n-card>
    </div>
    <n-modal v-model:show="showModal" preset="card" style="width:480px" :title="editingId?'编辑栏目':'新增栏目'">
      <n-form label-placement="left" label-width="80">
        <n-form-item label="上级栏目"><n-tree-select v-model:value="form.parent_id" :options="treeSelectOptions" placeholder="无（顶级栏目）" /></n-form-item>
        <n-form-item label="名称" required><n-input v-model:value="form.name" placeholder="栏目名称" /></n-form-item>
        <n-form-item label="排序"><n-input-number v-model:value="form.sort" :min="0" /></n-form-item>
        <n-form-item label="描述"><n-input v-model:value="form.description" placeholder="栏目描述" /></n-form-item>
        <n-form-item label="状态"><n-switch v-model:value="form.status" :checked-value="1" :unchecked-value="0" /></n-form-item>
      </n-form>
      <template #footer><n-space justify="end"><n-button @click="showModal=false">取消</n-button><n-button type="primary" :loading="saving" @click="handleSave">{{ editingId?'更新':'创建' }}</n-button></n-space></template>
    </n-modal>
  </n-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, h } from 'vue'
import { useMessage, NButton, NTag } from 'naive-ui'
import { getCategoryListApi, getCategoryTreeApi, saveCategoryApi, updateCategoryApi, deleteCategoryApi } from '@/api/cms'

const message = useMessage()
const loading = ref(false); const saving = ref(false)
const list = ref<any[]>([]); const treeData = ref<any[]>([]); const selectedKeys = ref<number[]>([])
const showModal = ref(false); const editingId = ref(0)
const form = reactive({ parent_id: 0 as number|null, name: '', sort: 0, description: '', status: 1 })
const cols = [
  { title:'ID',key:'id',width:60 },{ title:'名称',key:'name' },{ title:'上级',key:'parent_id',width:60 },
  { title:'排序',key:'sort',width:60 },
  { title:'状态',key:'status',width:70,render:(r:any)=>h(NTag,{type:r.status?'success':'default',size:'small'},{default:()=>r.status?'启用':'停用'}) },
  { title:'操作',key:'act',width:140,render:(r:any)=>[h(NButton,{size:'tiny',onClick:()=>openEdit(r)},{default:()=>'编辑'}),h(NButton,{size:'tiny',type:'error',style:{marginLeft:'6px'},onClick:()=>handleDelete(r.id)},{default:()=>'删除'})] }
]

const treeSelectOptions = computed(()=>{const walk=(nodes:any[]):any[]=>nodes.map((n:any)=>({label:n.name,key:n.id,value:n.id,children:n.children?walk(n.children):undefined}));return [{label:'顶级',key:0,value:0},...walk(treeData.value)]})

async function loadAll(){loading.value=true;try{const r1=await getCategoryListApi();list.value=r1.data.list||[];const r2=await getCategoryTreeApi();treeData.value=r2.data||[]}finally{loading.value=false}}
function onSelect(keys:number[]){selectedKeys.value=keys}
function openAdd(){editingId.value=0;form.parent_id=0;form.name='';form.sort=0;form.description='';form.status=1;showModal.value=true}
function openEdit(r:any){editingId.value=r.id;Object.assign(form,{parent_id:r.parent_id,name:r.name,sort:r.sort,description:r.description,status:r.status});showModal.value=true}
async function handleSave(){if(!form.name.trim()){message.warning('请填写名称');return};saving.value=true;try{if(editingId.value){await updateCategoryApi({id:editingId.value,...form})}else{await saveCategoryApi(form)};message.success(editingId.value?'已更新':'已创建');showModal.value=false;loadAll()}catch(e:any){message.error(e?.response?.data?.msg||'失败')}finally{saving.value=false}}
async function handleDelete(id:number){try{await deleteCategoryApi(id);message.success('已删除');loadAll()}catch(e:any){message.error(e?.response?.data?.msg||'删除失败')}}
onMounted(loadAll)
</script>
