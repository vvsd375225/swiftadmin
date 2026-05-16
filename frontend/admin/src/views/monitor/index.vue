<template>
  <div class="page-wrap">
    <n-grid :cols="4" :x-gap="16" :y-gap="16">
      <n-gi>
        <n-card title="CPU" size="small"><n-progress type="circle" :percentage="monitor.cpu?.usage || 0" />{{ monitor.cpu?.cores || 4 }}核</n-card>
      </n-gi>
      <n-gi>
        <n-card title="内存" size="small"><n-progress type="circle" :percentage="monitor.memory?.usage || 0" />{{ monitor.memory?.total || '-' }}</n-card>
      </n-gi>
      <n-gi>
        <n-card title="磁盘" size="small"><n-progress type="circle" :percentage="monitor.disk?.usage || 0" />{{ monitor.disk?.total || '-' }}</n-card>
      </n-gi>
      <n-gi>
        <n-card title="运行状态" size="small">
          <n-tag type="success">运行中</n-tag>
          <p style="font-size:12px;color:#999;margin-top:8px">{{ monitor.server?.time || '' }}</p>
        </n-card>
      </n-gi>
    </n-grid>

    <n-card title="服务器信息" :bordered="false" style="margin-top:16px">
      <n-descriptions :column="2" bordered size="small">
        <n-descriptions-item label="操作系统">{{ monitor.server?.os }}</n-descriptions-item>
        <n-descriptions-item label="PHP版本">{{ monitor.server?.php_version }}</n-descriptions-item>
        <n-descriptions-item label="服务器软件">{{ monitor.server?.server_software }}</n-descriptions-item>
        <n-descriptions-item label="启动时间">{{ monitor.server?.uptime }}</n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card title="请求统计" :bordered="false" style="margin-top:16px">
      <n-descriptions :column="4" bordered size="small">
        <n-descriptions-item label="总请求数">{{ requests.total_requests }}</n-descriptions-item>
        <n-descriptions-item label="今日请求">{{ requests.today_requests }}</n-descriptions-item>
        <n-descriptions-item label="平均响应(ms)">{{ requests.avg_response_time }}</n-descriptions-item>
        <n-descriptions-item label="错误率(%)">{{ requests.error_rate }}</n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card title="系统日志" :bordered="false" style="margin-top:16px">
      <n-data-table :columns="logColumns" :data="logs" size="small" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { getMonitorIndexApi, getMonitorRequestsApi, getMonitorLogsApi } from '@/api/monitor'

const monitor = ref<any>({ cpu: {}, memory: {}, disk: {}, server: {} })
const requests = ref<any>({})
const logs = ref<any[]>([])

const logColumns = [
  { title: '文件', key: 'file' },
  { title: '大小', key: 'size', width: 100 },
  { title: '修改时间', key: 'time', width: 180 }
]

async function fetchData() {
  try {
    const [m, r, l] = await Promise.all([getMonitorIndexApi(), getMonitorRequestsApi(), getMonitorLogsApi()])
    monitor.value = m.data; requests.value = r.data; logs.value = l.data
  } catch (e) {}
}
onMounted(() => fetchData())
</script>
