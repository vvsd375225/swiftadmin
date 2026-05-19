<template>
  <div class="db-root">
    <!-- 欢迎 -->
    <div class="db-welcome">
      <div class="db-welcome-left">
        <div class="db-greeting">欢迎回来，{{ userStore.info.nickname || 'Admin' }}</div>
        <div class="db-subtitle">SwiftAdmin 控制台 — 系统运行概览</div>
      </div>
      <div class="db-welcome-right">
        <div class="db-date">{{ today }}</div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="db-cards">
      <div class="db-card" v-for="(c, i) in statsCards" :key="c.label" :style="{ '--card-i': i }">
        <div class="db-card-top">
          <div class="db-card-icon" :style="{ background: c.bg }">{{ c.icon }}</div>
          <div class="db-card-value" :style="{ color: c.color }">{{ c.value }}</div>
        </div>
        <div class="db-card-label">{{ c.label }}</div>
        <div class="db-card-bar" :style="{ background: c.color }" />
      </div>
    </div>

    <!-- 图表行 -->
    <div class="db-charts">
      <div class="db-panel">
        <div class="db-panel-hd">
          <span class="db-panel-dot" style="background:#6d62fb;box-shadow:0 0 6px #6d62fb" />
          <span>用户注册趋势（近7天）</span>
        </div>
        <div ref="userChart" class="db-chart-box" />
      </div>
      <div class="db-panel">
        <div class="db-panel-hd">
          <span class="db-panel-dot" style="background:#4191d2;box-shadow:0 0 6px #4191d2" />
          <span>文章发布趋势（近7天）</span>
        </div>
        <div ref="articleChart" class="db-chart-box" />
      </div>
    </div>

    <!-- 底部行 -->
    <div class="db-bottom">
      <div class="db-panel db-panel-sm">
        <div class="db-panel-hd">
          <span class="db-panel-dot" style="background:#f29701;box-shadow:0 0 6px #f29701" />
          <span>文章分类</span>
        </div>
        <div ref="cateChart" class="db-chart-box" style="height:220px" />
      </div>
      <div class="db-panel db-panel-lg">
        <div class="db-panel-hd">
          <span class="db-panel-dot" style="background:#18a058;box-shadow:0 0 6px #18a058" />
          <span>最近操作</span>
        </div>
        <div class="db-log-list">
          <div class="db-log-item" v-for="(log, i) in logs" :key="i">
            <span class="db-log-user">{{ log.nickname || '系统' }}</span>
            <span class="db-log-action">{{ log.title }}</span>
            <span class="db-log-time">{{ log.create_time }}</span>
          </div>
          <div v-if="!logs.length" class="db-log-empty">暂无操作记录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { getDashboardApi } from '@/api/dashboard'
import * as echarts from 'echarts'

const userStore = useUserStore()
const userChart = ref<HTMLElement>()
const articleChart = ref<HTMLElement>()
const cateChart = ref<HTMLElement>()
const chartInstances: echarts.ECharts[] = []
const logs = ref<any[]>([])

const today = computed(() => {
  const d = new Date()
  const week = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${week[d.getDay()]}`
})

const statsCards = ref([
  { label: '管理员', value: 0, icon: '👤', color: '#6d62fb', bg: 'rgba(109,98,251,0.12)' },
  { label: '会员数', value: 0, icon: '👥', color: '#4191d2', bg: 'rgba(65,145,210,0.12)' },
  { label: '今日注册', value: 0, icon: '↗', color: '#18a058', bg: 'rgba(24,160,88,0.12)' },
  { label: '文章总数', value: 0, icon: '📄', color: '#f29701', bg: 'rgba(242,151,1,0.12)' },
  { label: '附件数', value: 0, icon: '📎', color: '#09c4ca', bg: 'rgba(9,196,202,0.12)' },
])

function fmtNum(n: number) {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  return n.toLocaleString()
}

function initChart(el: HTMLElement | null): echarts.ECharts | null {
  if (!el) return null
  const c = echarts.init(el, 'dark')
  chartInstances.push(c)
  return c
}

async function loadData() {
  const res = await getDashboardApi()
  const d = res.data

  statsCards.value = [
    { label: '管理员', value: fmtNum(d.admin_count || 0), icon: '👤', color: '#6d62fb', bg: 'rgba(109,98,251,0.12)' },
    { label: '会员数', value: fmtNum(d.user_count || 0), icon: '👥', color: '#4191d2', bg: 'rgba(65,145,210,0.12)' },
    { label: '今日注册', value: fmtNum(d.today_user || 0), icon: '↗', color: '#18a058', bg: 'rgba(24,160,88,0.12)' },
    { label: '文章总数', value: fmtNum(d.article_count || 0), icon: '📄', color: '#f29701', bg: 'rgba(242,151,1,0.12)' },
    { label: '附件数', value: fmtNum(d.attachment_count || 0), icon: '📎', color: '#09c4ca', bg: 'rgba(9,196,202,0.12)' },
  ]
  logs.value = d.recent_logs || []

  await nextTick()
  renderCharts(d)
}

function renderCharts(d: any) {
  chartInstances.forEach(c => c.dispose())
  chartInstances.length = 0

  const textColor = '#8899aa'
  const splitColor = 'rgba(255,255,255,0.05)'
  const axisColor = 'rgba(255,255,255,0.08)'

  const c1 = initChart(userChart.value)
  if (c1) c1.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: textColor },
    tooltip: { trigger: 'axis', borderColor: 'rgba(109,98,251,0.4)', backgroundColor: 'rgba(20,20,20,0.95)' },
    grid: { left: 40, right: 20, top: 20, bottom: 30 },
    xAxis: { type: 'category', data: d.seven_days?.map((i: any) => i.date) || [], axisLine: { lineStyle: { color: axisColor } }, axisTick: { show: false } },
    yAxis: { type: 'value', minInterval: 1, splitLine: { lineStyle: { color: splitColor } }, axisLabel: { color: textColor } },
    series: [{
      type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
      data: d.seven_days?.map((i: any) => i.count) || [],
      lineStyle: { color: '#6d62fb', width: 2.5, shadowBlur: 8, shadowColor: '#6d62fb' },
      itemStyle: { color: '#6d62fb', borderColor: '#fff', borderWidth: 1 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(109,98,251,0.35)' },
          { offset: 1, color: 'rgba(109,98,251,0)' },
        ]),
      },
    }],
  })

  const c2 = initChart(articleChart.value)
  if (c2) c2.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: textColor },
    tooltip: { trigger: 'axis', borderColor: 'rgba(65,145,210,0.4)', backgroundColor: 'rgba(20,20,20,0.95)' },
    grid: { left: 40, right: 20, top: 20, bottom: 30 },
    xAxis: { type: 'category', data: d.article_trend?.map((i: any) => i.date) || [], axisLine: { lineStyle: { color: axisColor } }, axisTick: { show: false } },
    yAxis: { type: 'value', minInterval: 1, splitLine: { lineStyle: { color: splitColor } }, axisLabel: { color: textColor } },
    series: [{
      type: 'bar',
      data: d.article_trend?.map((i: any) => i.count) || [],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#4191d2' }, { offset: 1, color: 'rgba(65,145,210,0.2)' },
        ]),
        borderRadius: [4, 4, 0, 0],
      },
      barWidth: 24,
    }],
  })

  const c3 = initChart(cateChart.value)
  const pieColors = ['#6d62fb', '#4191d2', '#18a058', '#f29701', '#09c4ca', '#e6584b', '#8b5cf6', '#3b82f6']
  if (c3) c3.setOption({
    backgroundColor: 'transparent',
    textStyle: { color: textColor },
    tooltip: { trigger: 'item', borderColor: 'rgba(109,98,251,0.4)', backgroundColor: 'rgba(20,20,20,0.95)' },
    series: [{
      type: 'pie', radius: ['50%', '78%'], center: ['50%', '52%'],
      itemStyle: { borderRadius: 3, borderColor: '#1d1e20', borderWidth: 3 },
      label: { color: textColor, fontSize: 11 },
      data: (d.category_stats || []).map((i: any, idx: number) => ({
        name: i.name, value: i.count, itemStyle: { color: pieColors[idx % pieColors.length] },
      })),
    }],
  })
}

onMounted(loadData)
onBeforeUnmount(() => chartInstances.forEach(c => c.dispose()))
</script>

<style scoped>
.db-root { padding: 20px 24px; min-height: 100%; }

.db-welcome { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.db-greeting { font-size: 20px; font-weight: 600; color: #e8eaed; }
.db-subtitle { font-size: 13px; color: #6b7280; margin-top: 4px; }
.db-date { font-size: 14px; color: #8899aa; }

.db-cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 16px; }

.db-card { position: relative; background: #1d1e20; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 18px 16px 14px; overflow: hidden; transition: all 0.25s; animation: cardIn 0.5s ease both; animation-delay: calc(var(--card-i, 0) * 0.06s); }
@keyframes cardIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
.db-card:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-2px); }
.db-card-top { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.db-card-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.db-card-value { font-size: 22px; font-weight: 700; font-family: 'Courier New', monospace; }
.db-card-label { font-size: 13px; color: #6b7280; }
.db-card-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; opacity: 0.7; }

.db-charts { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
.db-bottom { display: grid; grid-template-columns: 350px 1fr; gap: 14px; }

.db-panel { background: #1d1e20; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 16px 20px; }
.db-panel-hd { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; color: #c8cdd0; font-weight: 500; }
.db-panel-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.db-chart-box { width: 100%; height: 280px; }

.db-log-list { max-height: 220px; overflow-y: auto; }
.db-log-item { display: flex; align-items: center; gap: 12px; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.03); font-size: 13px; }
.db-log-user { color: #6d62fb; min-width: 60px; flex-shrink: 0; }
.db-log-action { color: #a0aab4; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.db-log-time { color: #555; font-size: 12px; flex-shrink: 0; }
.db-log-empty { color: #555; text-align: center; padding: 40px 0; font-size: 13px; }

.db-log-list::-webkit-scrollbar { width: 4px; }
.db-log-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
</style>
