<template>
  <n-card title="我发起的" :bordered="false">
    <template #header-extra><n-button type="primary" size="small" @click="openStart">发起审批</n-button></template>
    <n-data-table :columns="cols" :data="list" :loading="loading" :pagination="pagination" />
    <n-modal v-model:show="showStart" preset="card" style="width:480px" title="发起审批">
      <n-form label-placement="left" label-width="80">
        <n-form-item label="流程" required><n-select v-model:value="sf.def_id" :options="defOpts" placeholder="选择流程" /></n-form-item>
        <n-form-item label="标题" required><n-input v-model:value="sf.title" placeholder="审批标题" /></n-form-item>
      </n-form>
      <template #footer><n-space justify="end"><n-button @click="showStart=false">取消</n-button><n-button type="primary" :loading="starting" @click="handleStart">提交</n-button></n-space></template>
    </n-modal>
    <n-modal v-model:show="showD" preset="card" style="width:680px" title="详情">
      <template v-if="dt">
        <n-descriptions :column="2" bordered size="small">
          <n-descriptions-item label="标题">{{ dt.title }}</n-descriptions-item>
          <n-descriptions-item label="流程">{{ dt.definition_name }}</n-descriptions-item>
          <n-descriptions-item label="状态">{{ ['进行中','已通过','已驳回','已撤回'][dt.status] }}</n-descriptions-item>
          <n-descriptions-item label="时间">{{ dt.create_time }}</n-descriptions-item>
        </n-descriptions>
        <n-divider v-if="dt.records?.length">审批记录</n-divider>
        <n-timeline>
          <n-timeline-item v-for="(r,i) in dt.records" :key="i" :type="r.action==='agree'?'success':'error'" :title="r.assignee_name||r.assignee_id">
            <n-tag :type="r.action==='agree'?'success':'error'" size="small">{{ r.action_name }}</n-tag>
            <span v-if="r.comment" style="margin-left:8px;color:#888">{{ r.comment }}</span>
            <div style="font-size:11px;color:#666">{{ r.create_time }}</div>
          </n-timeline-item>
        </n-timeline>
      </template>
    </n-modal>
  </n-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { useMessage, NButton, NTag } from 'naive-ui'
import { getMineListApi, getWorkflowListApi, startInstanceApi, getInstanceDetailApi } from '@/api/workflow'

const message = useMessage()
const loading=ref(false);const starting=ref(false);const list=ref<any[]>([]);const dt=ref<any>(null)
const showStart=ref(false);const showD=ref(false)
const defOpts=ref<{label:string;value:number}[]>([])
const sf=reactive({def_id:null as number|null,title:''})
const pagination=reactive({page:1,pageSize:15,itemCount:0,showSizePicker:true,pageSizes:[10,15,30],onChange:(p:number)=>{pagination.page=p;load()},onUpdatePageSize:(s:number)=>{pagination.pageSize=s;load()}})

const cols=[{title:'ID',key:'id',width:60},{title:'标题',key:'title'},{title:'流程',key:'definition_name'},{title:'状态',key:'status',width:80,render:(r:any)=>h(NTag,{type:r.status===1?'success':r.status===2?'error':r.status===3?'warning':'info',size:'small'},{default:()=>['进行中','已通过','已驳回','已撤回'][r.status]})},{title:'时间',key:'create_time',width:160},{title:'操作',key:'act',width:80,render:(r:any)=>h(NButton,{size:'tiny',onClick:()=>openD(r.id)},{default:()=>'详情'})}]

async function load(){loading.value=true;try{const r=await getMineListApi({page:pagination.page,limit:pagination.pageSize});list.value=r.data.list||[];pagination.itemCount=r.data.total||0}finally{loading.value=false}}
async function openStart(){try{const r=await getWorkflowListApi({limit:100});defOpts.value=(r.data.list||[]).filter((d:any)=>d.status).map((d:any)=>({label:d.name,value:d.id}));sf.title='';sf.def_id=null;showStart.value=true}catch(e:any){message.error('获取失败')}}
async function handleStart(){if(!sf.def_id||!sf.title.trim()){message.warning('请完善');return};starting.value=true;try{await startInstanceApi({definition_id:sf.def_id,title:sf.title});message.success('已发起');showStart.value=false;load()}catch(e:any){message.error(e?.response?.data?.msg||'失败')}finally{starting.value=false}}
async function openD(id:number){try{const r=await getInstanceDetailApi(id);dt.value=r.data;showD.value=true}catch(e:any){message.error('获取失败')}}
onMounted(load)
</script>
