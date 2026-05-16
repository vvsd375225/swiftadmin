<template>
  <div>
    <n-card title="流程定义" :bordered="false">
      <template #header-extra>
        <n-button type="primary" size="small" @click="openDesigner()">新建流程</n-button>
      </template>
      <n-data-table :columns="columns" :data="list" :loading="loading" :pagination="pagination" />
      <n-modal v-model:show="showDesigner" preset="card" style="width:900px" :title="editingId ? '编辑流程' : '新建流程'">
        <n-form label-placement="left" label-width="80">
          <n-form-item label="名称" required><n-input v-model:value="form.name" placeholder="流程名称" /></n-form-item>
          <n-form-item label="描述"><n-input v-model:value="form.description" placeholder="流程描述" /></n-form-item>
          <n-form-item label="审批节点">
            <div style="width:100%">
              <div v-for="(node,i) in form.nodes" :key="i" style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
                <n-tag :type="i===0?'success':'info'" size="small">{{ i===0?'开始':'审批' }}</n-tag>
                <n-input v-model:value="node.label" placeholder="名称" size="small" style="width:120px" />
                <span style="font-size:12px;color:#888">审批人ID:</span>
                <n-input v-model:value="node.assignee" placeholder="admin_id" size="small" style="width:160px" />
                <n-button size="tiny" type="error" @click="form.nodes.splice(i,1)" :disabled="form.nodes.length<=1">删</n-button>
              </div>
              <n-button size="small" dashed @click="addNode" style="margin-top:4px">+ 添加节点</n-button>
            </div>
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button @click="showDesigner=false">取消</n-button>
            <n-button type="primary" :loading="saving" @click="handleSave">{{ editingId?'更新':'创建' }}</n-button>
          </n-space>
        </template>
      </n-modal>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { useMessage, NButton, NTag } from 'naive-ui'
import { getWorkflowListApi, saveWorkflowApi, updateWorkflowApi, deleteWorkflowApi } from '@/api/workflow'

const message = useMessage()
const loading = ref(false); const saving = ref(false)
const list = ref<any[]>([])
const showDesigner = ref(false); const editingId = ref(0)
const form = reactive({ name: '', description: '', nodes: [{ id: 'node_1', type: 'approval', label: '一级审批', assignee: '1' }] })
const pagination = reactive({ page: 1, pageSize: 15, itemCount: 0, showSizePicker: true, pageSizes: [10,15,30], onChange: (p:number)=>{pagination.page=p;loadList()}, onUpdatePageSize:(s:number)=>{pagination.pageSize=s;loadList()} })

const columns = [
  { title:'ID', key:'id', width:60 },
  { title:'名称', key:'name' },
  { title:'描述', key:'description', ellipsis:{tooltip:true} },
  { title:'版本', key:'version', width:60 },
  { title:'状态', key:'status', width:70, render:(row:any)=>h(NTag,{type:row.status?'success':'default',size:'small'},{default:()=>row.status?'启用':'停用'}) },
  { title:'创建时间', key:'create_time', width:160 },
  { title:'操作', key:'act', width:180, render:(row:any)=>[
    h(NButton,{size:'tiny',onClick:()=>openDesigner(row)},{default:()=>'编辑'}),
    h(NButton,{size:'tiny',type:'error',style:{marginLeft:'6px'},onClick:()=>handleDelete(row.id)},{default:()=>'删除'}),
  ]},
]

async function loadList(){ loading.value=true; try{ const res=await getWorkflowListApi({page:pagination.page,limit:pagination.pageSize}); list.value=res.data.list||[]; pagination.itemCount=res.data.total||0 }finally{loading.value=false} }
function addNode(){ form.nodes.push({ id:`node_${form.nodes.length+1}`, type:'approval', label:'审批节点', assignee:'' }) }
function openDesigner(row?:any){
  if(row?.id){ editingId.value=row.id; form.name=row.name; form.description=row.description||''; form.nodes=row.nodes?.length?row.nodes:[{id:'node_1',type:'approval',label:'审批节点',assignee:'1'}] }
  else { editingId.value=0; form.name=''; form.description=''; form.nodes=[{id:'node_1',type:'approval',label:'一级审批',assignee:'1'}] }
  showDesigner.value=true
}
async function handleSave(){
  if(!form.name.trim()){message.warning('请填写名称');return}
  saving.value=true
  try{
    if(editingId.value){ await updateWorkflowApi({id:editingId.value,...form}) }
    else { await saveWorkflowApi({...form,status:1,edges:[]}) }
    message.success(editingId.value?'已更新':'已创建'); showDesigner.value=false; loadList()
  }catch(e:any){message.error(e?.response?.data?.msg||'失败')}
  finally{saving.value=false}
}
async function handleDelete(id:number){ try{await deleteWorkflowApi(id);message.success('已删除');loadList()}catch(e:any){message.error(e?.response?.data?.msg||'删除失败')} }
onMounted(loadList)
</script>
