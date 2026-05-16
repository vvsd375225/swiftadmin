<template>
  <n-card title="Web 终端" size="small">
    <div class="terminal" ref="termRef" @click="focusInput">
      <div class="term-body">
        <div v-for="(line, i) in history" :key="i" class="term-line">
          <span v-if="line.type === 'cmd'" class="prompt">$ </span>
          <span v-if="line.type === 'error'" class="text-red">{{ line.text }}</span>
          <pre v-else class="term-text">{{ line.text }}</pre>
        </div>
        <div class="term-input-line">
          <span class="prompt">$ </span>
          <input
            ref="inputRef"
            v-model="cmd"
            class="term-input"
            @keydown.enter="handleEnter"
            @keydown.up.prevent="handleHistory(-1)"
            @keydown.down.prevent="handleHistory(1)"
            autofocus
          />
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { executeCommandApi } from '@/api/terminal'

const termRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const cmd = ref('')
const history = ref<{ type: string; text: string }[]>([])
const cmdHistory = ref<string[]>([])
const histIdx = ref(-1)
let tempInput = ''

function addLine(type: string, text: string) {
  history.value.push({ type, text })
  nextTick(() => {
    if (termRef.value) {
      termRef.value.scrollTop = termRef.value.scrollHeight
    }
  })
}

async function handleEnter() {
  const command = cmd.value.trim()
  if (!command) return

  cmdHistory.value.push(command)
  histIdx.value = cmdHistory.value.length
  addLine('cmd', command)

  if (command === 'clear') {
    history.value = []
    cmd.value = ''
    return
  }

  try {
    const res = await executeCommandApi(command)
    const output = res.data.output
    if (output) {
      output.split('\n').forEach((line: string) => addLine('out', line))
    } else {
      addLine('out', '(无输出)')
    }
  } catch (e: any) {
    addLine('error', e?.response?.data?.msg || e?.message || '执行失败')
  }

  cmd.value = ''
  tempInput = ''
}

function handleHistory(dir: number) {
  if (cmdHistory.value.length === 0) return

  if (histIdx.value === cmdHistory.value.length) {
    tempInput = cmd.value
  }

  histIdx.value += dir
  if (histIdx.value < 0) histIdx.value = 0
  if (histIdx.value > cmdHistory.value.length) histIdx.value = cmdHistory.value.length

  cmd.value = histIdx.value === cmdHistory.value.length
    ? tempInput
    : cmdHistory.value[histIdx.value] || ''
}

function focusInput() {
  inputRef.value?.focus()
}

onMounted(() => {
  addLine('out', 'Web 终端已就绪，输入命令开始...')
  addLine('out', '可用命令: ls, cat, php -v, git status, composer --version 等')
  inputRef.value?.focus()
})
</script>

<style scoped>
.terminal {
  height: 480px;
  background: #1e1e1e;
  border-radius: 4px;
  overflow-y: auto;
  font-family: Consolas, Monaco, 'Courier New', monospace;
  font-size: 14px;
  cursor: text;
}
.term-body {
  padding: 12px 16px;
  min-height: 100%;
}
.term-line {
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}
.term-text {
  margin: 0;
  color: #d4d4d4;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  white-space: pre-wrap;
}
.prompt {
  color: #6a9955;
  user-select: none;
}
.term-input-line {
  display: flex;
  align-items: center;
  margin-top: 2px;
}
.term-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #d4d4d4;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  caret-color: #fff;
}
.text-red { color: #f44747; }
</style>
