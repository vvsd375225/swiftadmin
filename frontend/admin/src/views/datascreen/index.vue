<template>
  <div class="ds-root">
    <!-- 背景装饰圆环 -->
    <div class="bg-decorations">
      <div class="deco-ring ring-1" />
      <div class="deco-ring ring-2" />
      <div class="deco-ring ring-3" />
      <div class="deco-ring ring-4" />
      <div class="deco-circle circle-1" />
      <div class="deco-circle circle-2" />
      <div class="deco-circle circle-3" />
      <div class="deco-dot dot-1" />
      <div class="deco-dot dot-2" />
      <div class="deco-dot dot-3" />
      <div class="deco-dot dot-4" />
      <div class="deco-dot dot-5" />
      <div class="deco-arc arc-1" />
      <div class="deco-arc arc-2" />
    </div>

    <!-- 顶栏 -->
    <header class="ds-header">
      <div class="ds-header-left">
        <span class="ds-logo-icon">◆</span>
        <span class="ds-title">SwiftAdmin 数据大屏</span>
        <span class="ds-subtitle">DATA VISUALIZATION</span>
      </div>
      <div class="ds-header-center">
        <div class="ds-clock">{{ now }}</div>
      </div>
      <div class="ds-header-right">
        <span class="ds-brand">Powered by 码创软件开发工作室</span>
      </div>
    </header>

    <div v-if="loading" class="ds-loading">
      <span class="loading-spinner" />
      <span>数据加载中...</span>
    </div>

    <template v-else>
      <!-- 统计卡片 -->
      <div class="ds-cards">
        <div class="ds-card" v-for="(c, i) in cards" :key="c.label" :style="{ '--card-index': i }">
          <div class="card-icon">
            <span v-if="i === 0">👤</span>
            <span v-else-if="i === 1">↗</span>
            <span v-else-if="i === 2">📄</span>
            <span v-else-if="i === 3">💰</span>
            <span v-else-if="i === 4">💳</span>
            <span v-else>📎</span>
          </div>
          <div class="card-body">
            <div class="card-label">{{ c.label }}</div>
            <div class="card-value" :style="{ color: c.color }">{{ c.value }}</div>
          </div>
          <div class="card-glow" :style="{ '--glow-color': c.color }" />
        </div>
      </div>

      <!-- 第一行：用户趋势 + 用户等级 -->
      <div class="ds-row">
        <div class="ds-panel wide">
          <div class="panel-hd">
            <span class="panel-dot" style="background:#09c4ca;box-shadow:0 0 8px #09c4ca" />
            <span class="panel-title">用户注册趋势（近7天）</span>
          </div>
          <div ref="userTrendChart" class="chart-box" />
        </div>
        <div class="ds-panel narrow">
          <div class="panel-hd">
            <span class="panel-dot" style="background:#f29701;box-shadow:0 0 8px #f29701" />
            <span class="panel-title">用户等级分布</span>
          </div>
          <div ref="userLevelChart" class="chart-box" />
        </div>
      </div>

      <!-- 第二行：支付趋势 + 文章趋势 -->
      <div class="ds-row">
        <div class="ds-panel">
          <div class="panel-hd">
            <span class="panel-dot" style="background:#09c4ca;box-shadow:0 0 8px #09c4ca" />
            <span class="panel-title">支付趋势</span>
          </div>
          <div ref="payChart" class="chart-box" />
        </div>
        <div class="ds-panel">
          <div class="panel-hd">
            <span class="panel-dot" style="background:#0ab5bd;box-shadow:0 0 8px #0ab5bd" />
            <span class="panel-title">文章阅读趋势</span>
          </div>
          <div ref="articleChart" class="chart-box" />
        </div>
      </div>

      <!-- 第三行：文件类型 + 系统信息 -->
      <div class="ds-row">
        <div class="ds-panel narrow">
          <div class="panel-hd">
            <span class="panel-dot" style="background:#f29701;box-shadow:0 0 8px #f29701" />
            <span class="panel-title">文件类型分布</span>
          </div>
          <div ref="fileChart" class="chart-box" />
        </div>
        <div class="ds-panel wide">
          <div class="panel-hd">
            <span class="panel-dot" style="background:#09c4ca;box-shadow:0 0 8px #09c4ca" />
            <span class="panel-title">系统信息</span>
          </div>
          <div class="sys-grid">
            <div v-for="(v, k) in server" :key="k" class="sys-cell">
              <div class="sys-key">{{ k }}</div>
              <div class="sys-val">{{ v }}</div>
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

const cyan = '#09c4ca'
const orange = '#f29701'
const cyanLight = 'rgba(9,196,202,'
const orangeLight = 'rgba(242,151,1,'

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
      { label: '用户总数', value: fmtNum(s.user_total || 0), color: cyan },
      { label: '今日新增', value: fmtNum(s.user_today || 0), color: '#41bfc4' },
      { label: '文章总数', value: fmtNum(s.article_total || 0), color: orange },
      { label: '支付订单', value: fmtNum(s.payment_total || 0), color: '#0ab5bd' },
      { label: '交易金额', value: '¥' + fmtNum(s.payment_amount || 0), color: '#dd8f06' },
      { label: '附件数量', value: fmtNum(s.attachment_total || 0), color: '#09c4ca' },
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

  const commonText = '#8ab4c0'
  const splitColor = 'rgba(9,196,202,0.08)'
  const axisColor = 'rgba(9,196,202,0.2)'

  // 用户趋势
  const c1 = initChart(userTrendChart.value)
  if (c1) c1.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: commonText },
    tooltip: { trigger: 'axis', borderColor: 'rgba(9,196,202,0.4)', backgroundColor: 'rgba(0,13,33,0.9)' },
    grid: { left: 40, right: 20, top: 20, bottom: 30 },
    xAxis: {
      type: 'category', data: d.user_trend?.map((i: any) => i.date.slice(5)) || [],
      axisLine: { lineStyle: { color: axisColor } }, axisTick: { show: false },
    },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: splitColor } }, axisLabel: { color: commonText } },
    series: [{
      type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
      data: d.user_trend?.map((i: any) => i.count) || [],
      lineStyle: { color: cyan, width: 2, shadowBlur: 10, shadowColor: cyan },
      itemStyle: { color: cyan, borderColor: '#fff', borderWidth: 1 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: cyanLight + '0.4)' },
          { offset: 1, color: cyanLight + '0)' },
        ]),
      },
    }],
  })

  // 用户等级
  const c2 = initChart(userLevelChart.value)
  const levelColors = ['#09c4ca', '#f29701', '#0ab5bd', '#41bfc4', '#dd8f06', '#067a80']
  if (c2) c2.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: commonText },
    tooltip: { trigger: 'item', borderColor: 'rgba(9,196,202,0.4)', backgroundColor: 'rgba(0,13,33,0.9)' },
    series: [{
      type: 'pie', radius: ['55%', '82%'], center: ['50%', '52%'],
      itemStyle: { borderRadius: 3, borderColor: 'rgba(0,13,33,0.8)', borderWidth: 4 },
      label: { color: commonText, fontSize: 11 },
      data: (d.user_level || []).map((i: any, idx: number) => ({
        name: i.name, value: i.count, itemStyle: { color: levelColors[idx % levelColors.length] },
      })),
    }],
  })

  // 支付趋势
  const c3 = initChart(payChart.value)
  if (c3) c3.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: commonText },
    tooltip: { trigger: 'axis', borderColor: 'rgba(9,196,202,0.4)', backgroundColor: 'rgba(0,13,33,0.9)' },
    legend: {
      data: ['订单数', '金额'], textStyle: { color: commonText }, bottom: 0,
      itemWidth: 12, itemHeight: 8,
    },
    grid: { left: 50, right: 50, top: 20, bottom: 40 },
    xAxis: {
      type: 'category', data: d.payment_trend?.map((i: any) => i.date.slice(5)) || [],
      axisLine: { lineStyle: { color: axisColor } }, axisTick: { show: false },
    },
    yAxis: [
      { type: 'value', name: '笔', splitLine: { lineStyle: { color: splitColor } }, axisLabel: { color: commonText } },
      { type: 'value', name: '¥', splitLine: { show: false }, axisLabel: { color: commonText } },
    ],
    series: [
      {
        name: '订单数', type: 'bar', data: d.payment_trend?.map((i: any) => i.count) || [],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#09c4ca' }, { offset: 1, color: 'rgba(9,196,202,0.3)' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: 20, barGap: '30%',
      },
      {
        name: '金额', type: 'line', yAxisIndex: 1, smooth: true,
        data: d.payment_trend?.map((i: any) => i.amount) || [],
        lineStyle: { color: orange, width: 2, shadowBlur: 8, shadowColor: orange },
        itemStyle: { color: orange }, symbol: 'circle', symbolSize: 6,
      },
    ],
  })

  // 文章趋势
  const c4 = initChart(articleChart.value)
  if (c4) c4.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: commonText },
    tooltip: { trigger: 'axis', borderColor: 'rgba(9,196,202,0.4)', backgroundColor: 'rgba(0,13,33,0.9)' },
    legend: {
      data: ['文章数', '阅读量'], textStyle: { color: commonText }, bottom: 0,
      itemWidth: 12, itemHeight: 8,
    },
    grid: { left: 40, right: 40, top: 20, bottom: 40 },
    xAxis: {
      type: 'category', data: d.article_trend?.map((i: any) => i.date.slice(5)) || [],
      axisLine: { lineStyle: { color: axisColor } }, axisTick: { show: false },
    },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: splitColor } }, axisLabel: { color: commonText } },
    series: [
      {
        name: '文章数', type: 'bar',
        data: d.article_trend?.map((i: any) => i.count) || [],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#0ab5bd' }, { offset: 1, color: 'rgba(10,181,189,0.25)' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: 20, barGap: '30%',
      },
      {
        name: '阅读量', type: 'bar',
        data: d.article_trend?.map((i: any) => i.views) || [],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#f29701' }, { offset: 1, color: 'rgba(242,151,1,0.25)' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: 20,
      },
    ],
  })

  // 文件类型
  const c5 = initChart(fileChart.value)
  const fileColors: Record<string, string> = {
    png: '#09c4ca', jpg: '#f29701', jpeg: '#dd8f06', pdf: '#0ab5bd',
    gif: '#41bfc4', svg: '#067a80', doc: '#3dd6db', xls: '#e6a820',
  }
  if (c5) c5.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: commonText },
    tooltip: { trigger: 'item', borderColor: 'rgba(9,196,202,0.4)', backgroundColor: 'rgba(0,13,33,0.9)' },
    series: [{
      type: 'pie', radius: ['40%', '72%'], center: ['50%', '52%'],
      itemStyle: { borderRadius: 3, borderColor: 'rgba(0,13,33,0.8)', borderWidth: 4 },
      label: { color: commonText, fontSize: 11 },
      data: (d.file_stats || []).map((i: any) => ({
        name: i.ext, value: i.count,
        itemStyle: { color: fileColors[i.ext] || '#3dd6db' },
      })),
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
  --cyan: #09c4ca;
  --orange: #f29701;
  --teal: #0ab5bd;
  --cyan-bright: #41bfc4;
  --bg-deep: #000d21;
  --bg-panel: rgba(2, 20, 39, 0.7);
  --border-subtle: rgba(9, 196, 202, 0.12);

  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #000d21 0%, #02132a 30%, #041d3c 60%, #043041 100%);
  color: #8ab4c0;
  font-family: 'Microsoft YaHei', -apple-system, sans-serif;
  padding: 0 24px 30px;
  overflow: hidden;
}

/* 背景网格 */
.ds-root::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(9, 196, 202, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(9, 196, 202, 0.03) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
  z-index: 0;
}

/* ===== 背景装饰元素 ===== */
.bg-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.deco-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(9, 196, 202, 0.12);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.ring-1 { width: 500px; height: 500px; top: -150px; right: -100px; border-color: rgba(9, 196, 202, 0.1); animation: rotateSlow 30s linear infinite; }
.ring-2 { width: 700px; height: 700px; bottom: -300px; left: -200px; border-color: rgba(242, 151, 1, 0.08); animation: rotateSlow 40s linear infinite reverse; }
.ring-3 { width: 350px; height: 350px; top: 40%; left: -100px; border-color: rgba(10, 181, 189, 0.1); animation: rotateSlow 25s linear infinite; }
.ring-4 { width: 420px; height: 420px; top: 20%; right: -150px; border: 1px dashed rgba(9, 196, 202, 0.08); animation: rotateSlow 35s linear infinite reverse; }

.deco-circle {
  position: absolute;
  border-radius: 50%;
  animation: floatCircle 8s ease-in-out infinite;
}
.circle-1 { width: 18px; height: 18px; top: 15%; right: 15%; background: rgba(9, 196, 202, 0.3); box-shadow: 0 0 20px rgba(9, 196, 202, 0.4); animation-delay: 0s; }
.circle-2 { width: 10px; height: 10px; top: 60%; left: 8%; background: rgba(242, 151, 1, 0.35); box-shadow: 0 0 15px rgba(242, 151, 1, 0.4); animation-delay: 3s; }
.circle-3 { width: 14px; height: 14px; top: 30%; right: 25%; background: rgba(65, 191, 196, 0.3); box-shadow: 0 0 18px rgba(65, 191, 196, 0.35); animation-delay: 5s; }

.deco-dot {
  position: absolute;
  width: 3px; height: 3px;
  border-radius: 50%;
  background: rgba(9, 196, 202, 0.4);
  animation: pulseDot 3s ease-in-out infinite;
}
.dot-1 { top: 8%; right: 30%; animation-delay: 0s; }
.dot-2 { top: 45%; left: 5%; animation-delay: 0.8s; }
.dot-3 { bottom: 20%; right: 10%; animation-delay: 1.6s; }
.dot-4 { top: 25%; left: 20%; animation-delay: 2.2s; background: rgba(242, 151, 1, 0.4); }
.dot-5 { bottom: 35%; right: 35%; animation-delay: 1s; }

.deco-arc {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
  animation: rotateSlow 20s linear infinite;
}
.arc-1 { width: 300px; height: 300px; top: 50%; left: 60%; border-top-color: rgba(9, 196, 202, 0.08); border-right-color: rgba(9, 196, 202, 0.12); }
.arc-2 { width: 250px; height: 250px; bottom: 15%; right: 20%; border-bottom-color: rgba(242, 151, 1, 0.08); border-left-color: rgba(242, 151, 1, 0.1); animation-direction: reverse; animation-duration: 28s; }

@keyframes rotateSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes floatCircle {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
  50% { transform: translateY(-20px) scale(1.3); opacity: 1; }
}

@keyframes pulseDot {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(2); }
}

/* ===== 顶栏 ===== */
.ds-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(9, 196, 202, 0.15);
}

.ds-header-left { display: flex; align-items: center; gap: 10px; }

.ds-logo-icon {
  font-size: 24px;
  color: var(--cyan);
  filter: drop-shadow(0 0 6px rgba(9, 196, 202, 0.5));
}

.ds-title {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(90deg, #09c4ca, #41bfc4, #09c4ca);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
  letter-spacing: 2px;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 200% center; }
}

.ds-subtitle {
  font-size: 11px;
  color: rgba(138, 180, 192, 0.5);
  letter-spacing: 3px;
  font-weight: 300;
}

.ds-clock {
  font-size: 18px;
  color: var(--cyan-bright);
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(65, 191, 196, 0.4);
}

.ds-brand { font-size: 12px; color: rgba(138, 180, 192, 0.45); letter-spacing: 1px; }

/* ===== 加载 ===== */
.ds-loading {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 80px;
  color: var(--cyan);
  font-size: 15px;
}

.loading-spinner {
  width: 24px; height: 24px;
  border: 2px solid rgba(9, 196, 202, 0.2);
  border-top-color: var(--cyan);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ===== 统计卡片 ===== */
.ds-cards {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
  margin-bottom: 14px;
}

.ds-card {
  position: relative;
  background: var(--bg-panel);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 18px 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 14px;
  animation: cardIn 0.6s ease both;
  animation-delay: calc(var(--card-index, 0) * 0.08s);
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.ds-card:hover {
  border-color: rgba(9, 196, 202, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 4px 24px rgba(9, 196, 202, 0.1);
}

.card-icon { font-size: 28px; opacity: 0.8; line-height: 1; }
.card-body { flex: 1; min-width: 0; }

.card-label { font-size: 13px; color: rgba(138, 180, 192, 0.6); margin-bottom: 6px; }

.card-value {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 12px currentColor;
  letter-spacing: 1px;
}

.card-glow {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--glow-color);
  opacity: 0.6;
}

/* ===== 面板 ===== */
.ds-row {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}

.ds-panel {
  background: var(--bg-panel);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 14px 18px;
  transition: border-color 0.3s;
}
.ds-panel:hover { border-color: rgba(9, 196, 202, 0.25); }

.panel-hd {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(9, 196, 202, 0.1);
}

.panel-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.panel-title { font-size: 14px; color: #b8d8e0; font-weight: 500; }
.chart-box { width: 100%; height: 260px; }

/* ===== 系统信息 ===== */
.sys-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 8px 0;
}

.sys-cell {
  background: rgba(9, 196, 202, 0.03);
  border: 1px solid rgba(9, 196, 202, 0.06);
  border-radius: 6px;
  padding: 12px 14px;
  transition: all 0.3s;
}
.sys-cell:hover { background: rgba(9, 196, 202, 0.06); border-color: rgba(9, 196, 202, 0.2); }

.sys-key { font-size: 12px; color: rgba(138, 180, 192, 0.5); margin-bottom: 6px; letter-spacing: 0.5px; }
.sys-val { font-size: 14px; color: var(--cyan-bright); font-family: 'Courier New', monospace; word-break: break-all; font-weight: 500; }
</style>
