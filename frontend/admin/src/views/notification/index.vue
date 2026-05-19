<template>
  <n-card title="消息通知" :bordered="false">
    <template #header-extra><n-button size="small" @click="markAll">全部已读</n-button></template>
    <n-tabs v-model:value="filter" @update:value="load" type="line">
      <n-tab-pane name="all" tab="全部" />
      <n-tab-pane name="unread" tab="未读" />
      <n-tab-pane name="read" tab="已读" />
    </n-tabs>
    <n-data-table :columns="cols" :data="list" :loading="loading" :pagination="pagination" />
  </n-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { useMessage, NButton, NTag } from 'naive-ui'
import { getNotificationListApi, markReadApi, markAllReadApi } from '@/api/notification'

const message = useMessage()
const loading = ref(false); const list = ref<any[]>([]); const filter = ref('all')
const pagination = reactive({ page:1,pageSize:15,itemCount:0,showSizePicker:true,pageSizes:[10,15,30],onChange:(p:number)=>{pagination.page=p;load()},onUpdatePageSize:(s:number)=>{pagination.pageSize=s;load()} })

const cols = [
  { title:'ID',key:'id',width:60 },
  { title:'类型',key:'type',width:80,render:(r:any)=>h(NTag,{type:r.type==='system'?'info':r.type==='workflow'?'warning':'default',size:'small'},{default:()=>r.type}) },
  { title:'标题',key:'title',ellipsis:{tooltip:true} },
  { title:'内容',key:'content',ellipsis:{tooltip:true} },
  { title:'状态',key:'is_read',width:80,render:(r:any)=>r.is_read?h(NTag,{type:'default',size:'small'},{default:()=>'已读'}):h(NTag,{type:'error',size:'small'},{default:()=>'未读'}) },
  { title:'时间',key:'create_time',width:160 },
  { title:'操作',key:'act',width:100,render:(r:any)=>[!r.is_read?h(NButton,{size:'tiny',type:'primary',onClick:()=>handleMarkRead(r.id)},{default:()=>'标为已读'}):null] }
]

async function load(){loading.value=true;try{const params:any={page:pagination.page,limit:pagination.pageSize};if(filter.value==='unread')params.is_read=0;else if(filter.value==='read')params.is_read=1;const r=await getNotificationListApi(params);list.value=r.data.list||[];pagination.itemCount=r.data.total||0}finally{loading.value=false}}
async function handleMarkRead(id:number){await markReadApi(id);message.success('已读');load()}
async function markAll(){await markAllReadApi();message.success('全部已读');load()}
onMounted(load)
</script>
