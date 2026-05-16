<template>
  <n-card title="我的待办" :bordered="false">
    <n-data-table :columns="columns" :data="list" :loading="loading" :pagination="pagination" />
    <n-modal v-model:show="showDetail" preset="card" style="width:680px" title="审批处理">
      <template v-if="current">
        <n-descriptions :column="2" bordered size="small">
          <n-descriptions-item label="标题">{{ current.title }}</n-descriptions-item>
          <n-descriptions-item label="流程">{{ current.definition_name }}</n-descriptions-item>
          <n-descriptions-item label="发起时间">{{ current.create_time }}</n-descriptions-item>
        </n-descriptions>
        <n-divider>审批意见</n-divider>
        <n-input v-model:value="comment" type="textarea" placeholder="输入审批意见" />
        <n-space justify="center" style="margin-top:14px">
          <n-button type="success" :loading="acting" @click="handleAgree">✓ 通过</n-button>
          <n-button type="error" :loading="acting" @click="handleReject">✗ 驳回</n-button>
        </n-space>
        <n-divider v-if="records.length">审批记录</n-divider>
        <n-timeline>
          <n-timeline-item v-for="(r,i) in records" :key="i" :type="r.action==='agree'?'success':'error'" :title="r.assignee_name||r.assignee_id">
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
import { getTodoListApi, getInstanceDetailApi, agreeInstanceApi, rejectInstanceApi } from '@/api/workflow'

const message = useMessage()
const loading = ref(false); const acting = ref(false)
const list = ref<any[]>([]); const current = ref<any>(null); const records = ref<any[]>([])
const comment = ref(''); const showDetail = ref(false)
const pagination = reactive({ page:1,pageSize:15,itemCount:0,showSizePicker:true,pageSizes:[10,15,30],onChange:(p:number)=>{pagination.page=p;loadList()},onUpdatePageSize:(s:number)=>{pagination.pageSize=s;loadList()} })

const columns = [
  { title:'ID',key:'id',width:60 },
  { title:'标题',key:'title' },
  { title:'流程',key:'definition_name' },
  { title:'当前节点',key:'current_node',width:120 },
  { title:'发起时间',key:'create_time',width:160 },
  { title:'操作',key:'act',width:80,render:(row:any)=>h(NButton,{size:'tiny',type:'primary',onClick:()=>openDetail(row.id)},{default:()=>'处理'}) },
]

async function loadList(){ loading.value=true; try{ const r=await getTodoListApi({page:pagination.page,limit:pagination.pageSize}); list.value=r.data.list||[]; pagination.itemCount=r.data.total||0 }finally{loading.value=false} }
async function openDetail(id:number){ try{ const r=await getInstanceDetailApi(id); current.value=r.data; records.value=r.data.records||[]; comment.value=''; showDetail.value=true }catch(e:any){message.error('获取失败')} }
async function handleAgree(){ if(!current.value)return; acting.value=true; try{ await agreeInstanceApi({instance_id:current.value.id,comment:comment.value}); message.success('已通过'); showDetail.value=false; loadList() }catch(e:any){message.error(e?.response?.data?.msg||'失败')}finally{acting.value=false} }
async function handleReject(){ if(!current.value)return; acting.value=true; try{ await rejectInstanceApi({instance_id:current.value.id,comment:comment.value}); message.success('已驳回'); showDetail.value=false; loadList() }catch(e:any){message.error(e?.response?.data?.msg||'失败')}finally{acting.value=false} }
onMounted(loadList)
</script>
