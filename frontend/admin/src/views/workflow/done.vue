<template>
  <n-card title="我的已办" :bordered="false">
    <n-data-table :columns="columns" :data="list" :loading="loading" :pagination="pagination" />
  </n-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { NTag } from 'naive-ui'
import { getDoneListApi } from '@/api/workflow'

const loading = ref(false); const list = ref<any[]>([])
const pagination = reactive({ page:1,pageSize:15,itemCount:0,showSizePicker:true,pageSizes:[10,15,30],onChange:(p:number)=>{pagination.page=p;load()},onUpdatePageSize:(s:number)=>{pagination.pageSize=s;load()} })
const columns = [
  { title:'ID',key:'id',width:60 },
  { title:'标题',key:'title' },
  { title:'流程',key:'definition_name' },
  { title:'操作',key:'action_name',width:80,render:(row:any)=>h(NTag,{type:row.action==='agree'?'success':'error',size:'small'},{default:()=>row.action_name}) },
  { title:'意见',key:'comment',ellipsis:{tooltip:true} },
  { title:'时间',key:'create_time',width:160 },
]
async function load(){ loading.value=true; try{ const r=await getDoneListApi({page:pagination.page,limit:pagination.pageSize}); list.value=r.data.list||[]; pagination.itemCount=r.data.total||0 }finally{loading.value=false} }
onMounted(load)
</script>
