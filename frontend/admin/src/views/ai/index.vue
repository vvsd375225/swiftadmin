<template>
  <div class="terminal-root">
    <div class="scanlines" />

    <!-- ==================== 激活页 ==================== -->
    <div v-if="!activated" class="activate-page">
      <div class="terminal-card">
        <div class="terminal-header">
          <span class="dot red" /><span class="dot yellow" /><span class="dot green" />
          <span class="header-title">系统激活 · LICENSE_ACTIVATION</span>
        </div>
        <div class="terminal-body">
          <pre class="ascii-logo">
   ███████╗██╗    ██╗██╗███████╗████████╗
   ██╔════╝██║    ██║██║██╔════╝╚══██╔══╝
   ███████╗██║ █╗ ██║██║█████╗     ██║
   ╚════██║██║███╗██║██║██╔══╝     ██║
   ███████║╚███╔███╔╝██║██║        ██║
   ╚══════╝ ╚══╝╚══╝ ╚═╝╚═╝        ╚═╝
          </pre>
          <p class="brand-line">「 码创软件开发工作室 」AI 智能开发平台</p>
          <div class="divider">══════════════════════════════════</div>

          <div class="prompt-line">
            <span class="prompt">激活码:~$ </span>
            <input
              v-model="licenseKey"
              class="terminal-input"
              placeholder="输入License密钥..."
              :disabled="activating"
              @keydown.enter="handleActivate"
            />
            <span class="cursor-blink">█</span>
          </div>

          <div v-if="activateMsg" class="msg-line" :class="activateMsgType">
            {{ activateMsg }}
          </div>

          <div class="trial-row">
            <button class="trial-btn" :disabled="activating" @click="startTrial">
              ▸ 免费体验
            </button>
            <span class="trial-desc">无需 License，每日 {{ trialDailyLimit }} token 免费额度</span>
          </div>

          <div class="divider">──────────────────────────────────────</div>

          <div class="info-block">
            <p class="label">[ 会员等级 ]</p>
            <table class="tier-table">
              <tr v-for="(t, k) in tiers" :key="k">
                <td class="col-tier"><span :class="'tier-badge tier-' + k">{{ t.name }}</span></td>
                <td class="col-limit">{{ formatTokens(t.limit) }} tokens/月</td>
                <td class="col-desc">{{ k === 'free' ? '试用体验' : k === 'basic' ? '个人开发者' : k === 'pro' ? '专业团队' : '企业级' }}</td>
              </tr>
            </table>
          </div>

          <div class="divider">──────────────────────────────────────</div>

          <div class="info-block">
            <p class="label">[ 获取 License ]</p>
            <p class="dim">当前为测试阶段，联系客服获取激活码</p>
            <p><span class="key">邮箱：</span>support@mcsw.dev</p>
            <p><span class="key">微信：</span>mcsw2025</p>
            <p><span class="key">QQ群：</span>123456789</p>
            <p class="dim mt">※ 支付系统开发中，当前为模拟测试模式</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== 聊天页 ==================== -->
    <div v-else class="chat-page">
      <!-- 顶部状态栏 -->
      <div class="status-bar">
        <div class="status-left">
          <span class="status-dot" />
          <span class="status-text">SwiftAdmin AI v2.0</span>
          <span class="status-sep">|</span>
          <span class="status-text" :class="{ 'trial-badge': isTrial }">{{ isTrial ? '免费体验 · 每日' + trialDailyLimit + 'token' : '等级：' + (activationInfo.tier_name || '免费版') }}</span>
        </div>
        <div class="status-center">
          <span class="brand-tag">码创软件开发工作室</span>
        </div>
        <div class="status-right">
          <span class="status-text">用量：</span>
          <span class="quota-bar-wrap">
            <span class="quota-bar" :style="{ width: quota.pct + '%' }" :class="quotaWarnClass" />
          </span>
          <span class="status-text">{{ formatTokens(quota.used) }}/{{ formatTokens(quota.limit) }}</span>
          <span class="status-sep">|</span>
          <span class="status-text" :class="quotaWarnClass">{{ quota.pct }}%</span>
          <button v-if="hasMaster === false" class="master-btn" title="管理员配置主密钥" @click="showMasterKey = true">⚙ 配置密钥</button>
        </div>
      </div>

      <!-- 聊天区 -->
      <div class="chat-area" ref="chatRef">
        <div v-if="messages.length === 0" class="welcome">
          <pre class="welcome-art">
  ███████╗██╗    ██╗██╗███████╗████████╗
  ██╔════╝██║    ██║██║██╔════╝╚══██╔══╝
  ███████╗██║ █╗ ██║██║█████╗     ██║
  ╚════██║██║███╗██║██║██╔══╝     ██║
  ███████║╚███╔███╔╝██║██║        ██║
  ╚══════╝ ╚══╝╚══╝ ╚═╝╚═╝        ╚═╝
          </pre>
          <p class="dim">▌ 码创AI开发引擎 v2.0 | ThinkPHP 6 · Vue3 · NaiveUI</p>
          <p class="dim">▌ 开发模式：AI 生成代码自动落盘 aisc/</p>
          <p class="dim">▌ 插件模式：生成完整模块 → 一键安装到系统（含数据库自动导入）</p>
          <div class="quick-tags">
            <span v-for="q in quickPrompts" :key="q.label" class="quick-tag" @click="askQuick(q.text)">{{ q.label }}</span>
          </div>

          <!-- 使用指南 -->
          <div class="guide-toggle" @click="showGuide = !showGuide">
            {{ showGuide ? '▾' : '▸' }} 使用指南
          </div>
          <div v-if="showGuide" class="guide-panel">
            <div class="guide-section">
              <div class="guide-title">▌ 第一步：获取 License</div>
              <p>联系<strong>「码创软件开发工作室」</strong>购买 License，支付完成后系统自动填入密钥、分配模型、开通额度。全程无需用户手动配置任何技术参数。</p>
              <p>当前为测试阶段，联系客服免费获取激活码：</p>
              <p><span class="key">邮箱：</span>support@mcsw.dev · <span class="key">微信：</span>mcsw2025</p>
            </div>
            <div class="guide-section">
              <div class="guide-title">▌ 第二步：激活</div>
              <p>在激活页面输入 License 密钥，系统<strong>自动完成所有配置</strong>——AI 服务对接、模型选择、会员额度分配全部后台自动处理，无需任何手动操作。</p>
            </div>
            <div class="guide-section">
              <div class="guide-title">▌ 三种模式</div>
              <table class="guide-table">
                <tr><td class="g-col1">💬 问答</td><td>自由对话，AI 解答技术问题、提供开发建议，不会自动保存文件</td></tr>
                <tr><td class="g-col1">⚡ 开发</td><td>AI 自动生成完整代码（控制器+Vue页面+API+路由），自动保存到系统</td></tr>
                <tr><td class="g-col1">📦 插件</td><td>AI 生成完整插件模块（含数据库建表SQL），支持一键安装到系统</td></tr>
              </table>
            </div>
            <div class="guide-section">
              <div class="guide-title">▌ 一键安装（插件模式）</div>
              <p>① 选择「插件」模式，用自然语言描述你想要的插件功能</p>
              <p>② AI 自动生成所有文件并保存到系统</p>
              <p>③ 消息下方点击「▸ 一键安装到系统」，数据库自动建表、模块注册，即刻生效</p>
            </div>
            <div class="guide-section">
              <div class="guide-title">▌ Token 用量说明</div>
              <table class="guide-table">
                <tr><td class="g-col1">免费版</td><td>10万/月</td><td>试用体验</td></tr>
                <tr><td class="g-col1">基础版</td><td>100万/月</td><td>个人开发者</td></tr>
                <tr><td class="g-col1">专业版</td><td>500万/月</td><td>专业团队</td></tr>
                <tr><td class="g-col1">企业版</td><td>5000万/月</td><td>企业级不限</td></tr>
              </table>
              <p class="mt-sm"><strong>用量提醒：</strong>顶部状态栏实时显示当月用量。用量达到 <span class="warn-text">70% 黄色预警</span>，达到 <span class="danger-text">90% 红色警告</span>。<strong>额度用尽后 AI 自动停止响应</strong>，如需继续使用请联系「码创软件开发工作室」续费或升级会员等级。</p>
            </div>
            <div class="guide-section">
              <div class="guide-title">▌ 快捷键</div>
              <p><code>Enter</code> 发送 · <code>Shift+Enter</code> 换行 · <code>Ctrl+L</code> 清空对话</p>
            </div>
          </div>
        </div>

        <!-- 消息列表 -->
        <div v-for="(msg, i) in messages" :key="i" class="msg-row" :class="msg.role">
          <div class="msg-meta">
            <span class="msg-prompt">{{ msg.role === 'user' ? '我' : 'AI助手' }}</span>
            <span class="msg-time">{{ msg.time || '' }}</span>
          </div>
          <div class="msg-body">
            <div v-html="renderMarkdown(msg.content)" />

            <!-- 已保存文件摘要 -->
            <div v-if="msg.savedFiles && msg.savedFiles.length" class="saved-summary">
              <div class="saved-header">▌ 已自动保存 {{ msg.savedFiles.length }} 个文件到 aisc/</div>
              <div v-for="(f, fi) in msg.savedFiles" :key="fi" class="saved-file">
                <span class="saved-icon">✓</span>
                <span class="saved-path">aisc/{{ f.path }}</span>
                <button class="preview-btn" @click="previewFile(f)">预览</button>
              </div>
              <!-- 一键安装：插件模式且包含模块时显示 -->
              <div v-if="msg.installableModule" class="install-bar">
                <div class="install-info">
                  ⚡ 检测到插件模块：<strong>{{ msg.installableModule }}</strong>
                </div>
                <button
                  class="install-btn"
                  :disabled="installing === msg.installableModule"
                  @click="oneClickInstall(msg.installableModule, i)"
                >
                  {{ installing === msg.installableModule ? '▸ 安装中...' : '▸ 一键安装到系统' }}
                </button>
                <span v-if="installedModule === msg.installableModule" class="installed-ok">✓ 安装成功</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 加载中 -->
        <div v-if="sending" class="msg-row assistant">
          <div class="msg-meta"><span class="msg-prompt">AI助手</span></div>
          <div class="msg-body">
            <span class="loading-text">
              {{ mode === 'develop' ? '▸ 正在生成代码并自动保存...' : mode === 'plugin' ? '▸ 正在构建插件模块...' : '▸ 思考中...' }}
            </span>
            <span class="cursor-blink">█</span>
          </div>
        </div>
      </div>

      <!-- 底部输入区 -->
      <div class="input-bar">
        <div class="mode-row">
          <span class="mode-label">模式：</span>
          <button :class="['mode-btn', { active: mode === 'chat' }]" @click="mode = 'chat'">问答</button>
          <button :class="['mode-btn', { active: mode === 'develop' }]" @click="mode = 'develop'">开发</button>
          <button :class="['mode-btn', { active: mode === 'plugin' }]" @click="mode = 'plugin'">插件</button>
          <span class="mode-desc">{{ modeDesc }}</span>
          <div class="mode-right">
            <button class="action-btn" :disabled="messages.length === 0" @click="clearChat">清空</button>
          </div>
        </div>
        <div class="input-row">
          <span class="prompt">$</span>
          <input
            ref="inputRef"
            v-model="input"
            class="cmd-input"
            :placeholder="inputPlaceholder"
            :disabled="sending"
            @keydown="handleKeydown"
          />
          <button class="send-btn" :disabled="!input.trim() || sending" @click="send">执行</button>
        </div>
      </div>
    </div>

    <!-- ==================== 文件预览弹窗 ==================== -->
    <n-modal v-model:show="previewShow" title="文件预览" preset="card" style="width: 700px;">
      <template #header>
        <span style="color: #00ff41; font-family: monospace;">▌ {{ previewPath }}</span>
      </template>
      <pre class="preview-content">{{ previewContent }}</pre>
      <template #footer>
        <n-space justify="end">
          <n-button @click="previewShow = false">关闭</n-button>
          <n-button type="primary" @click="copyCode(previewContent)">复制</n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- ==================== 主密钥弹窗 ==================== -->
    <n-modal v-model:show="showMasterKey" title="▌ 主密钥配置" preset="card" style="width: 460px;">
      <template #header>
        <span style="color: #00ff41; font-family: monospace;">▌ 主密钥配置（仅管理员）</span>
      </template>
      <n-form label-placement="left" label-width="70">
        <n-form-item label="接口地址">
          <n-input v-model:value="masterForm.api_url" placeholder="由码创软件开发工作室提供的接口地址" />
        </n-form-item>
        <n-form-item label="API密钥">
          <n-input v-model:value="masterForm.api_key" type="password" placeholder="sk-..." />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showMasterKey = false">取消</n-button>
          <n-button type="primary" :loading="savingMaster" @click="handleSaveMaster">保存</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { aiChatApi, aiConfigApi, aiActivateApi, aiSetupMasterKeyApi, aiSaveFileApi } from '@/api/ai'
import { installFromAiscApi } from '@/api/module'

const message = useMessage()

// ─── 激活 ────────────────────────────────
const activated = ref(false)
const isTrial = ref(false)
const trialDailyLimit = ref(10)
const activating = ref(false)
const licenseKey = ref('')
const activateMsg = ref('')
const activateMsgType = ref<'success' | 'error'>('error')
const activationInfo = ref<any>({})
const tiers = ref<Record<string, { name: string; limit: number }>>({})

// ─── 配额 ────────────────────────────────
const quota = ref({ pct: 0, used: 0, limit: 100000, remaining: 100000 })

// ─── 聊天 ────────────────────────────────
const input = ref('')
const sending = ref(false)
const showGuide = ref(false)
const mode = ref('chat')
const messages = ref<{ role: string; content: string; time?: string; savedFiles?: { path: string; content: string }[] }[]>([])
const chatRef = ref<any>()
const inputRef = ref<any>()

// ─── 预览 ────────────────────────────────
const previewShow = ref(false)
const previewPath = ref('')
const previewContent = ref('')

// ─── 一键安装 ────────────────────────────
const installing = ref('')
const installedModule = ref('')

// ─── 主密钥 ──────────────────────────────
const hasMaster = ref<boolean | null>(null)
const showMasterKey = ref(false)
const savingMaster = ref(false)
const masterForm = ref({ api_url: '', api_key: '' })

// ─── 计算属性 ────────────────────────────
const quotaWarnClass = computed(() => quota.value.pct > 90 ? 'danger' : quota.value.pct > 70 ? 'warn' : '')

const modeDesc = computed(() => {
  if (mode.value === 'develop') return '// AI 自动生成完整代码并保存到 aisc/'
  if (mode.value === 'plugin') return '// AI 自动构建插件模块并保存全部文件'
  return '// 自由问答，不会自动保存文件'
})

const quickPrompts = computed(() => {
  if (mode.value === 'develop') return [
    { label: '生成CRUD', text: '为 orders 表（id, order_no, user_id, amount, status, create_time）生成完整CRUD后台管理' },
    { label: '生成API', text: '创建用户余额查询、充值记录的API接口，路径 /api/v1/balance' },
    { label: '生成看板', text: '生成带 ECharts 图表的统计看板，包含用户增长趋势和订单统计' },
  ]
  if (mode.value === 'plugin') return [
    { label: '支付模块', text: '设计支付模块插件（modules/payment），支持支付宝和微信支付，包含安装SQL和配置页' },
    { label: 'CMS模块', text: '创建CMS内容管理模块，文章分类+列表+富文本编辑+前台展示' },
    { label: '积分商城', text: '创建积分商城模块，商品列表+兑换记录+积分管理+前台页面' },
  ]
  return [
    { label: '能力介绍', text: '你好，请介绍一下你能帮我做什么' },
    { label: '框架架构', text: 'SwiftAdmin 的路由注册和数据库操作方式是怎样的？' },
    { label: '开发流程', text: '给框架添加一个新功能页面需要哪些步骤？' },
  ]
})

const inputPlaceholder = computed(() => {
  if (mode.value === 'develop') return '描述功能需求，AI 自动生成代码并保存到 aisc/ ...'
  if (mode.value === 'plugin') return '描述插件需求，AI 自动构建模块并保存全部文件...'
  return '输入内容，Enter 执行，Shift+Enter 换行'
})

// ─── 格式化 ──────────────────────────────
function formatTokens(n: number) {
  if (n >= 100000000) return (n / 100000000).toFixed(1) + '亿'
  if (n >= 10000) return (n / 10000).toFixed(1) + '万'
  return n.toLocaleString()
}

// 解析 ```lang:path  格式的代码块
function parseCodeBlocks(text: string) {
  const blocks: { lang: string; path: string; content: string }[] = []
  const re = /```(\w+)(?::([^\n]+))?\s*\n([\s\S]*?)```/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    blocks.push({ lang: m[1] || '', path: (m[2] || '').trim(), content: m[3] })
  }
  return blocks
}

function renderMarkdown(text: string) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/```(\w+)(?::([^\n]+))?\s*\n([\s\S]*?)```/g,
      (_: string, lang: string, _path: string, code: string) =>
        `<pre class="code-block"><span class="code-lang">// ${lang || 'code'}${_path ? ' → aisc/' + _path : ''}</span>\n${code}</pre>`)
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}

// ─── 加载配置 ────────────────────────────
async function loadConfig() {
  try {
    const res = await aiConfigApi()
    const d = res.data
    activated.value = d.activated || false
    isTrial.value = d.is_trial ?? false
    activationInfo.value = {
      tier: d.tier, tier_name: d.tier_name, expiry: d.expiry,
      expiry_at: d.expiry_at, domain: d.domain, brand: d.brand,
    }
    quota.value = {
      pct: d.quota?.pct || 0, used: d.quota?.used || 0,
      limit: d.quota?.limit || trialDailyLimit.value, remaining: d.quota?.remaining || trialDailyLimit.value,
    }
    tiers.value = d.tiers || {}
    hasMaster.value = d.has_master ?? false
  } catch {}
}

// ─── 激活 ────────────────────────────────
async function handleActivate() {
  const key = licenseKey.value.trim()
  if (!key) { activateMsg.value = '请输入 License 密钥'; activateMsgType.value = 'error'; return }
  activating.value = true
  activateMsg.value = ''
  try {
    await aiActivateApi(key)
    activateMsg.value = '✓ 激活成功 — 欢迎使用 SwiftAdmin AI 开发平台'
    activateMsgType.value = 'success'
    setTimeout(() => loadConfig(), 800)
  } catch (e: any) {
    activateMsg.value = e?.response?.data?.msg || '✗ 激活失败，请检查密钥是否正确'
    activateMsgType.value = 'error'
  } finally { activating.value = false }
}

function startTrial() {
  isTrial.value = true
  activated.value = true
  quota.value = { pct: 0, used: 0, limit: trialDailyLimit.value, remaining: trialDailyLimit.value }
}

// ─── 聊天 + 自动保存 ─────────────────────
function scrollBottom() {
  nextTick(() => { if (chatRef.value) chatRef.value.scrollTop = 99999 })
}

function askQuick(text: string) { input.value = text; send() }

async function copyCode(text: string) {
  try { await navigator.clipboard.writeText(text); message.success('已复制') }
  catch { message.warning('复制失败') }
}

function previewFile(f: { path: string; content: string }) {
  previewPath.value = 'aisc/' + f.path
  previewContent.value = f.content
  previewShow.value = true
}

// 从保存路径中检测模块名（如 modules/payment/manifest.json → payment）
function detectModule(savedFiles: { path: string }[]) {
  for (const f of savedFiles) {
    const m = f.path.match(/^modules\/([^/]+)\//)
    if (m) return m[1]
  }
  return null
}

// 一键安装
async function oneClickInstall(moduleName: string, msgIndex: number) {
  installing.value = moduleName
  try {
    await installFromAiscApi(moduleName)
    installedModule.value = moduleName
    message.success(`插件「${moduleName}」已安装到系统`)
    // 刷新配额
    await loadConfig()
  } catch (e: any) {
    message.error(e?.response?.data?.msg || '安装失败')
  } finally {
    installing.value = ''
  }
}

// 自动保存所有带路径的代码块
async function autoSaveBlocks(text: string) {
  const blocks = parseCodeBlocks(text)
  const saved: { path: string; content: string }[] = []
  for (const b of blocks) {
    if (!b.path) continue
    try {
      await aiSaveFileApi(b.path, b.content)
      saved.push({ path: b.path, content: b.content })
    } catch (e: any) {
      console.error('保存失败:', b.path, e)
    }
  }
  return saved
}

async function send() {
  const text = input.value.trim()
  if (!text || sending.value) return
  const now = new Date().toLocaleTimeString()
  messages.value.push({ role: 'user', content: text, time: now })
  input.value = ''
  scrollBottom()
  sending.value = true
  try {
    const res = await aiChatApi(messages.value, mode.value)
    const reply = res.data.reply || ''
    const now2 = new Date().toLocaleTimeString()

    // 开发/插件模式：自动解析并保存代码
    let savedFiles: { path: string; content: string }[] = []
    if (mode.value === 'develop' || mode.value === 'plugin') {
      savedFiles = await autoSaveBlocks(reply)
    }

    messages.value.push({ role: 'assistant', content: reply, time: now2, savedFiles, installableModule: detectModule(savedFiles) })
    if (res.data.quota) quota.value = res.data.quota

    if (savedFiles.length) {
      message.success(`已自动保存 ${savedFiles.length} 个文件到 aisc/`)
    }
  } catch (e: any) {
    messages.value.push({ role: 'assistant', content: '[!] ' + (e?.response?.data?.msg || '请求失败'), time: new Date().toLocaleTimeString() })
  } finally { sending.value = false; scrollBottom() }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); clearChat() }
}

function clearChat() { messages.value = [] }

// ─── 主密钥 ──────────────────────────────
async function handleSaveMaster() {
  savingMaster.value = true
  try {
    await aiSetupMasterKeyApi({ api_url: masterForm.value.api_url, api_key: masterForm.value.api_key })
    message.success('主密钥已部署，用户激活后将自动调用')
    showMasterKey.value = false
    await loadConfig()
  } catch (e: any) { message.error(e?.response?.data?.msg || '部署失败') }
  finally { savingMaster.value = false }
}

onMounted(loadConfig)
</script>

<style scoped>
/* ========== 基础 ========== */
.terminal-root {
  height: calc(100vh - 200px);
  background: #0a0a0a;
  color: #00ff41;
  font-family: 'Courier New', 'Consolas', 'Microsoft YaHei', monospace;
  position: relative;
  overflow: hidden;
}
.scanlines {
  position: absolute; inset: 0; pointer-events: none; z-index: 10;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.15) 2px, rgba(0,0,0,.15) 4px);
}

/* ========== 激活页 ========== */
.activate-page { height: 100%; overflow-y: auto; padding: 20px; display: flex; justify-content: center; align-items: flex-start; }
.terminal-card { width: 100%; max-width: 560px; border: 1px solid #1a3a1a; border-radius: 6px; background: #0d0d0d; overflow: hidden; }
.terminal-header { display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: #111; border-bottom: 1px solid #1a3a1a; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot.red { background: #ff5f56; } .dot.yellow { background: #ffbd2e; } .dot.green { background: #27c93f; }
.header-title { font-size: 11px; color: #666; margin-left: 8px; }
.terminal-body { padding: 20px 24px; }
.ascii-logo { color: #00ff41; font-size: 11px; line-height: 1.3; margin: 0 0 8px; }
.brand-line { color: #00cc33; font-size: 14px; text-align: center; }
.divider { color: #1a3a1a; font-size: 12px; margin: 12px 0; text-align: center; }
.prompt-line { display: flex; align-items: center; gap: 4px; margin: 8px 0; }
.prompt { color: #00ff41; white-space: nowrap; }
.terminal-input { flex: 1; background: transparent; border: none; color: #fff; font: inherit; font-size: 14px; outline: none; caret-color: #00ff41; }
.terminal-input::placeholder { color: #333; }
.cursor-blink { animation: blink 1s infinite; }
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
.msg-line { padding: 8px 0; font-size: 13px; }
.msg-line.success { color: #00ff41; }
.msg-line.error { color: #ff4444; }
.info-block { font-size: 12px; line-height: 1.8; }
.label { color: #00ff41; font-weight: bold; }
.key { color: #00cc33; }
.dim { color: #555; }
.mt { margin-top: 8px; }

/* 免费体验按钮 */
.trial-row { display: flex; align-items: center; gap: 10px; margin: 8px 0; }
.trial-btn {
  background: #0d2818; border: 1px solid #ffaa00; color: #ffaa00;
  font: inherit; font-size: 13px; padding: 6px 20px; border-radius: 4px;
  cursor: pointer; transition: all .2s;
}
.trial-btn:hover:not(:disabled) { background: #ffaa00; color: #000; }
.trial-btn:disabled { opacity: 0.3; }
.trial-desc { color: #555; font-size: 11px; }
.trial-badge { color: #ffaa00 !important; }
.tier-table { width: 100%; border-collapse: collapse; margin: 4px 0; }
.tier-table td { padding: 4px 6px; font-size: 12px; }
.col-tier { width: 80px; } .col-limit { width: 110px; color: #aaa; } .col-desc { color: #555; }
.tier-badge { padding: 2px 6px; border-radius: 3px; font-size: 11px; }
.tier-free { color: #888; border: 1px solid #333; }
.tier-basic { color: #00ccff; border: 1px solid #006688; }
.tier-pro { color: #00ff41; border: 1px solid #008833; }
.tier-enterprise { color: #ffaa00; border: 1px solid #886600; }

/* ========== 聊天页 ========== */
.chat-page { height: 100%; display: flex; flex-direction: column; }

/* 状态栏 */
.status-bar { display: flex; align-items: center; justify-content: space-between; padding: 4px 12px; background: #0d0d0d; border-bottom: 1px solid #1a3a1a; font-size: 11px; flex-shrink: 0; gap: 8px; }
.status-left, .status-center, .status-right { display: flex; align-items: center; gap: 6px; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; background: #00ff41; box-shadow: 0 0 4px #00ff41; }
.status-text { color: #888; }
.status-sep { color: #333; }
.brand-tag { color: #00cc33; font-weight: bold; }
.quota-bar-wrap { width: 80px; height: 8px; background: #1a1a1a; border-radius: 4px; display: inline-block; overflow: hidden; border: 1px solid #333; }
.quota-bar { height: 100%; background: #00ff41; transition: width .5s; }
.quota-bar.warn { background: #ffaa00; }
.quota-bar.danger { background: #ff4444; }
.master-btn { background: none; border: 1px solid #333; color: #666; cursor: pointer; font-size: 11px; padding: 1px 6px; border-radius: 3px; font-family: inherit; }
.master-btn:hover { color: #00ff41; border-color: #00ff41; }

/* 聊天区 */
.chat-area { flex: 1; overflow-y: auto; padding: 16px; }
.chat-area::-webkit-scrollbar { width: 4px; }
.chat-area::-webkit-scrollbar-thumb { background: #1a3a1a; }
.welcome { text-align: center; padding: 20px 0; }
.welcome-art { color: #00ff41; font-size: 10px; line-height: 1.2; margin: 0; }
.quick-tags { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 16px; }
.quick-tag { padding: 4px 12px; border: 1px solid #1a3a1a; border-radius: 3px; color: #00cc33; font-size: 12px; cursor: pointer; transition: all .2s; }
.quick-tag:hover { background: #0d2818; border-color: #00ff41; }

/* 使用指南 */
.guide-toggle { color: #555; font-size: 12px; cursor: pointer; margin-top: 20px; text-align: center; transition: color .2s; }
.guide-toggle:hover { color: #00ff41; }
.guide-panel { margin-top: 14px; padding: 16px 20px; border: 1px solid #1a3a1a; border-radius: 6px; background: #0a100a; text-align: left; }
.guide-section { margin-bottom: 14px; }
.guide-section:last-child { margin-bottom: 0; }
.guide-title { color: #00ff41; font-size: 13px; margin-bottom: 6px; }
.guide-section p { color: #888; font-size: 12px; line-height: 1.8; margin: 2px 0; }
.guide-section strong { color: #00cc33; }
.guide-section code { background: #0d2818; color: #00ff41; padding: 1px 6px; border-radius: 3px; font-size: 11px; }
.guide-table { width: 100%; border-collapse: collapse; }
.guide-table td { padding: 3px 0; color: #888; font-size: 12px; line-height: 1.8; }
.g-col1 { width: 70px; color: #00ff41 !important; }
.warn-text { color: #ffaa00; }
.danger-text { color: #ff4444; }
.mt-sm { margin-top: 6px; }

/* 消息 */
.msg-row { margin-bottom: 14px; }
.msg-row.user .msg-meta { color: #0088cc; }
.msg-row.assistant .msg-meta { color: #00ff41; }
.msg-meta { font-size: 11px; margin-bottom: 2px; display: flex; gap: 8px; }
.msg-time { color: #444; }
.msg-body { font-size: 13px; line-height: 1.7; color: #ccc; }
.loading-text { color: #00ff41; }

/* 代码块 */
:deep(.code-block) { background: #0d1117; border: 1px solid #1a3a1a; border-radius: 4px; padding: 12px; margin: 8px 0; color: #00cc33; font-size: 12px; overflow-x: auto; white-space: pre; font-family: 'Courier New', monospace; }
:deep(.code-lang) { color: #555; font-size: 11px; }
:deep(.inline-code) { background: #0d2818; color: #00ff41; padding: 1px 5px; border-radius: 3px; font-size: 12px; }
:deep(strong) { color: #fff; }

/* 已保存文件摘要 */
.saved-summary { margin-top: 10px; border: 1px solid #00ff41; border-radius: 4px; background: #0d1a0d; overflow: hidden; }
.saved-header { padding: 6px 10px; background: #0d2818; color: #00ff41; font-size: 12px; border-bottom: 1px solid #1a3a1a; }
.saved-file { display: flex; align-items: center; gap: 8px; padding: 5px 10px; font-size: 12px; border-bottom: 1px solid #111; }
.saved-file:last-child { border-bottom: none; }
.saved-icon { color: #00ff41; }
.saved-path { color: #00cc33; flex: 1; }
.preview-btn { background: none; border: 1px solid #1a3a1a; color: #888; font: inherit; font-size: 11px; padding: 2px 8px; border-radius: 3px; cursor: pointer; }
.preview-btn:hover { color: #00ff41; border-color: #00ff41; }

/* 一键安装 */
.install-bar { display: flex; align-items: center; gap: 12px; padding: 8px 12px; background: #0d1a0d; border-top: 1px solid #1a3a1a; }
.install-info { color: #ffaa00; font-size: 12px; flex: 1; }
.install-info strong { color: #ffcc00; }
.install-btn { background: #1a3a0d; border: 1px solid #00ff41; color: #00ff41; font: inherit; font-size: 12px; padding: 4px 16px; border-radius: 3px; cursor: pointer; transition: all .2s; }
.install-btn:hover:not(:disabled) { background: #00ff41; color: #000; }
.install-btn:disabled { opacity: 0.5; }
.installed-ok { color: #00ff41; font-size: 12px; }

/* 预览弹窗 */
.preview-content { background: #0d1117; color: #00cc33; padding: 16px; border-radius: 4px; font-size: 12px; max-height: 500px; overflow: auto; white-space: pre; font-family: 'Courier New', monospace; border: 1px solid #1a3a1a; }

/* 输入栏 */
.input-bar { flex-shrink: 0; border-top: 1px solid #1a3a1a; background: #0d0d0d; padding: 8px 12px; }
.mode-row { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }
.mode-label { color: #555; font-size: 11px; }
.mode-btn { background: none; border: 1px solid #333; color: #666; font: inherit; font-size: 11px; padding: 2px 10px; border-radius: 3px; cursor: pointer; }
.mode-btn:hover { color: #00ff41; border-color: #555; }
.mode-btn.active { color: #00ff41; border-color: #00ff41; background: #0d2818; }
.mode-desc { color: #444; font-size: 10px; margin-left: 8px; }
.mode-right { margin-left: auto; }
.action-btn { background: none; border: 1px solid #333; color: #666; font: inherit; font-size: 11px; padding: 2px 8px; border-radius: 3px; cursor: pointer; }
.action-btn:hover:not(:disabled) { color: #ff4444; border-color: #ff4444; }
.action-btn:disabled { opacity: 0.3; }
.input-row { display: flex; align-items: center; gap: 8px; }
.cmd-input { flex: 1; background: transparent; border: none; color: #fff; font: inherit; font-size: 13px; outline: none; caret-color: #00ff41; }
.cmd-input::placeholder { color: #333; }
.send-btn { background: #0d2818; border: 1px solid #00ff41; color: #00ff41; font: inherit; font-size: 12px; padding: 4px 16px; border-radius: 3px; cursor: pointer; }
.send-btn:hover:not(:disabled) { background: #00ff41; color: #000; }
.send-btn:disabled { opacity: 0.3; }
</style>
