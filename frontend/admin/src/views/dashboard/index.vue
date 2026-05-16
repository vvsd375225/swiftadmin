<template>
  <div>
    <h1>SwiftAdmin 控制台</h1>
    <p style="color: #999; margin-bottom: 24px">欢迎回来，{{ userStore.info.nickname || 'Admin' }}</p>

    <n-grid :cols="4" :x-gap="16" class="mb-6">
      <n-grid-item v-for="card in cards" :key="card.title">
        <n-card hoverable>
          <n-statistic :label="card.title" :value="card.value" />
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-card title="近7天用户注册趋势">
      <div ref="chartRef" style="height: 360px" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useUserStore } from '@/stores/user'
import { getDashboardApi } from '@/api/dashboard'
import * as echarts from 'echarts'

const userStore = useUserStore()
const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const cards = ref([
  { title: '管理员数', value: 0 },
  { title: '会员数', value: 0 },
  { title: '今日注册', value: 0 },
  { title: '附件数', value: 0 },
])

async function initChart() {
  const res = await getDashboardApi()

  cards.value = [
    { title: '管理员数', value: res.data.admin_count },
    { title: '会员数', value: res.data.user_count },
    { title: '今日注册', value: res.data.today_user },
    { title: '附件数', value: res.data.attachment_count },
  ]

  await nextTick()
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)
  const dates = res.data.seven_days.map((d: any) => d.date)
  const counts = res.data.seven_days.map((d: any) => d.count)
  chart.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: dates, boundaryGap: false },
    yAxis: { type: 'value', minInterval: 1 },
    series: [{
      type: 'line',
      data: counts,
      smooth: true,
      areaStyle: { color: 'rgba(24,160,88,0.1)' },
      lineStyle: { color: '#18A058', width: 2 },
      itemStyle: { color: '#18A058' },
    }],
  })
}

onMounted(initChart)
onBeforeUnmount(() => chart?.dispose())
</script>
