<template>
  <div class="ds-root">
    <header class="ds-header">
      <div class="ds-title">SwiftAdmin 数据大屏</div>
      <div class="ds-clock">{{ now }}</div>
      <div class="ds-brand">Powered by 码创软件开发工作室</div>
    </header>

    <div v-if="loading" class="ds-loading">▸ 加载中...</div>

    <template v-else>
      <div class="ds-cards">
        <div class="ds-card" v-for="c in cards" :key="c.label">
          <div class="card-label">{{ c.label }}</div>
          <div class="card-value" :style="{ color: c.color }">{{ c.value }}</div>
        </div>
      </div>

      <div class="ds-row">
        <div class="ds-panel">
          <div class="panel-title">用户注册趋势（近7天）</div>
          <div ref="userTrendChart" class="chart-box" />
        </div>
        <div class="ds-panel narrow">
          <div class="panel-title">用户等级分布</div>
          <div ref="userLevelChart" class="chart-box" />
        </div>
      </div>

      <div class="ds-row">
        <div class="ds-panel">
          <div class="panel-title">支付趋势</div>
          <div ref="payChart" class="chart-box" />
        </div>
        <div class="ds-panel">
          <div class="panel-title">文章阅读趋势</div>
          <div ref="articleChart" class="chart-box" />
        </div>
      </div>

      <div class="ds-row">
        <div class="ds-panel narrow">
          <div class="panel-title">文件类型分布</div>
          <div ref="fileChart" class="chart-box" />
        </div>
        <div class="ds-panel">
          <div class="panel-title">系统信息</div>
          <div class="sys-info">
            <div v-for="(v, k) in server" :key="k" class="sys-row">
              <span class="sys-key">{{ k }}</span>
              <span class="sys-val">{{ v }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import { getDataScreenApi } from '@/api/datascreen'

const loading = ref(true)
const now = ref('')
const server = ref<Record<string, string>>({})
const cards = ref<{ label: string; value: string; color: string }[]>([])
let clockTimer: number | null = null
let refreshTimer: number | null = null

const userTrendChart = ref<HTMLElement | null>(null)
const userLevelChart = ref<HTMLElement | null>(null)
const payChart = ref<HTMLElement | null>(null)
const articleChart = ref<HTMLElement | null>(null)
const fileChart = ref<HTMLElement | null>(null)
const chartInstances: echarts.ECharts[] = []

function fmtNum(n: number) {
  if (n >= 10000) return (n / 10000).toFixed(1) + '万'
  return n.toLocaleString()
}

function initChart(el: HTMLElement | null): echarts.ECharts | null {
  if (!el) return null
  const c = echarts.init(el, 'dark')
  chartInstances.push(c)
  return c
}

async function loadData() {
  try {
    const res = await getDataScreenApi()
    const d = res.data
    server.value = d.server || {}
    const s = d.stats || {}
    cards.value = [
      { label: '用户总数', value: fmtNum(s.user_total || 0), color: '#00ff41' },
      { label: '今日新增', value: fmtNum(s.user_today || 0), color: '#00ccff' },
      { label: '文章总数', value: fmtNum(s.article_total || 0), color: '#ffaa00' },
      { label: '支付订单', value: fmtNum(s.payment_total || 0), color: '#00cc88' },
      { label: '交易金额', value: '¥' + fmtNum(s.payment_amount || 0), color: '#ff6644' },
      { label: '附件数量', value: fmtNum(s.attachment_total || 0), color: '#cc88ff' },
    ]
    await nextTick()
    renderCharts(d)
  } catch { /* */ }
  finally { loading.value = false }
}

function disposeCharts() {
  chartInstances.forEach(c => c.dispose())
  chartInstances.length = 0
}

function renderCharts(d: any) {
  disposeCharts()
  // 用户趋势
  const c1 = initChart(userTrendChart.value)
  if (c1) c1.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: '#8899aa' },
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 20, top: 20, bottom: 30 },
    xAxis: { type: 'category', data: d.user_trend?.map((i: any) => i.date.slice(5)) || [], axisLine: { lineStyle: { color: '#333' } } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#1a2a1a' } } },
    series: [{
      type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
      data: d.user_trend?.map((i: any) => i.count) || [],
      lineStyle: { color: '#00ff41', width: 2 }, itemStyle: { color: '#00ff41' },
      areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,255,65,0.3)' }, { offset: 1, color: 'rgba(0,255,65,0)' }]) },
    }],
  })

  // 用户等级
  const c2 = initChart(userLevelChart.value)
  if (c2) c2.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: '#8899aa' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie', radius: ['50%', '78%'], center: ['50%', '52%'],
      itemStyle: { borderRadius: 4, borderColor: '#080c10', borderWidth: 3 },
      label: { color: '#8899aa', fontSize: 11 },
      data: (d.user_level || []).map((i: any) => ({ name: i.name, value: i.count, itemStyle: { color: i.name === '普通用户' ? '#00ccff' : '#ffaa00' } })),
    }],
  })

  // 支付趋势
  const c3 = initChart(payChart.value)
  if (c3) c3.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: '#8899aa' },
    tooltip: { trigger: 'axis' },
    legend: { data: ['订单数', '金额'], textStyle: { color: '#8899aa' }, bottom: 0 },
    grid: { left: 50, right: 50, top: 20, bottom: 40 },
    xAxis: { type: 'category', data: d.payment_trend?.map((i: any) => i.date.slice(5)) || [], axisLine: { lineStyle: { color: '#333' } } },
    yAxis: [
      { type: 'value', name: '笔', splitLine: { lineStyle: { color: '#1a2a1a' } } },
      { type: 'value', name: '¥', splitLine: { show: false } },
    ],
    series: [
      { name: '订单数', type: 'bar', data: d.payment_trend?.map((i: any) => i.count) || [], itemStyle: { color: '#00ccff' }, barWidth: 16 },
      { name: '金额', type: 'line', yAxisIndex: 1, smooth: true, data: d.payment_trend?.map((i: any) => i.amount) || [], lineStyle: { color: '#ff6644', width: 2 }, itemStyle: { color: '#ff6644' } },
    ],
  })

  // 文章趋势
  const c4 = initChart(articleChart.value)
  if (c4) c4.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: '#8899aa' },
    tooltip: { trigger: 'axis' },
    legend: { data: ['文章数', '阅读量'], textStyle: { color: '#8899aa' }, bottom: 0 },
    grid: { left: 40, right: 40, top: 20, bottom: 40 },
    xAxis: { type: 'category', data: d.article_trend?.map((i: any) => i.date.slice(5)) || [], axisLine: { lineStyle: { color: '#333' } } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#1a2a1a' } } },
    series: [
      { name: '文章数', type: 'bar', data: d.article_trend?.map((i: any) => i.count) || [], itemStyle: { color: '#ffaa00' }, barWidth: 16 },
      { name: '阅读量', type: 'bar', data: d.article_trend?.map((i: any) => i.views) || [], itemStyle: { color: '#00ff41' }, barWidth: 16 },
    ],
  })

  // 文件类型
  const c5 = initChart(fileChart.value)
  const colors: Record<string, string> = { png: '#00ff41', jpg: '#ffaa00', pdf: '#ff4444', gif: '#cc88ff', svg: '#00ccff' }
  if (c5) c5.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: '#8899aa' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie', radius: '72%', center: ['50%', '52%'],
      label: { color: '#8899aa', fontSize: 11 },
      data: (d.file_stats || []).map((i: any) => ({ name: i.ext, value: i.count, itemStyle: { color: colors[i.ext] || '#666' } })),
    }],
  })
}

function updateClock() {
  now.value = new Date().toLocaleString('zh-CN', { hour12: false })
}

onMounted(() => {
  updateClock()
  clockTimer = window.setInterval(updateClock, 1000)
  loadData()
  refreshTimer = window.setInterval(loadData, 30000)
})

onBeforeUnmount(() => {
  if (clockTimer) clearInterval(clockTimer)
  if (refreshTimer) clearInterval(refreshTimer)
  chartInstances.forEach(c => c.dispose())
})
</script>

<style scoped>
.ds-root {
  min-height: 100vh; background: #080c10; color: #8899aa;
  font-family: 'Microsoft YaHei', sans-serif; padding: 0 20px 20px;
  background-image:
    linear-gradient(rgba(0,255,65,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,65,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}
.ds-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #1a2a2a; margin-bottom: 16px; }
.ds-title { font-size: 22px; font-weight: bold; background: linear-gradient(90deg, #00ff41, #00ccff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.ds-clock { font-size: 18px; color: #00ff41; font-family: 'Courier New', monospace; }
.ds-brand { font-size: 12px; color: #444; }
.ds-loading { text-align: center; color: #00ff41; padding: 60px; font-size: 16px; }

.ds-cards { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-bottom: 12px; }
.ds-card { background: linear-gradient(135deg, #0d1520, #0a1018); border: 1px solid #1a2a2a; border-radius: 6px; padding: 14px 16px; }
.card-label { font-size: 12px; color: #666; margin-bottom: 6px; }
.card-value { font-size: 26px; font-weight: bold; font-family: 'Courier New', monospace; }

.ds-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.ds-panel { background: #0d1520; border: 1px solid #1a2a2a; border-radius: 6px; padding: 12px 16px; }
.panel-title { font-size: 13px; color: #00ccff; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid #1a2a2a; }
.chart-box { width: 100%; height: 260px; }

.sys-info { padding: 8px 0; }
.sys-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #111; font-size: 13px; }
.sys-key { color: #666; }
.sys-val { color: #00ccff; font-family: 'Courier New', monospace; }
</style>
