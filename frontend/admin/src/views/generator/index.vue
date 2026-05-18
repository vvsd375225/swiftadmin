<template>
  <div class="generator-layout">
    <!-- 左侧：数据表列表 -->
    <n-card title="数据表" size="small" class="left-panel">
      <template #header-extra>
        <n-input v-model:value="tableSearch" size="tiny" placeholder="搜索表名..." clearable style="width:130px" />
      </template>
      <n-spin :show="tableLoading">
        <n-scrollbar style="flex:1;min-height:0">
          <div
            v-for="opt in filteredTables"
            :key="opt.key"
            class="table-item"
            :class="{ active: selectedTable === opt.key }"
            @click="handleTableSelect(opt.key)"
          >
            <div class="table-item-main">
              <span class="table-dot" :class="{ active: selectedTable === opt.key }" />
              <span class="table-name">{{ opt.name }}</span>
            </div>
            <span class="table-comment">{{ opt.comment }}</span>
          </div>
        </n-scrollbar>
      </n-spin>
    </n-card>

    <!-- 中间：字段配置 -->
    <n-card size="small" class="center-panel" :title="selectedTable ? '字段配置' : ''">
      <template v-if="selectedTable" #header-extra>
        <n-space :size="8">
          <n-tag type="info" size="small">{{ tableName }}</n-tag>
          <n-tag size="small">{{ fields.length }} 个字段</n-tag>
        </n-space>
      </template>
      <template v-if="!selectedTable">
        <n-empty description="请先选择左侧数据表" style="margin-top:80px" />
      </template>
      <template v-else>
        <n-spin :show="fieldLoading">
          <n-scrollbar style="flex:1;min-height:0">
            <div class="field-list">
              <div
                v-for="(f, idx) in fields"
                :key="f.name"
                class="field-row"
                :class="{ 'field-skip': skipFields.includes(f.name) }"
              >
                <!-- 排序按钮 -->
                <div class="field-sort">
                  <n-button
                    v-if="idx > 0"
                    quaternary
                    circle
                    size="tiny"
                    @click="moveField(idx, -1)"
                    title="上移"
                  >
                    <template #icon><n-icon size="12"><ChevronUpOutline /></n-icon></template>
                  </n-button>
                  <n-button
                    v-if="idx < fields.length - 1"
                    quaternary
                    circle
                    size="tiny"
                    @click="moveField(idx, 1)"
                    title="下移"
                  >
                    <template #icon><n-icon size="12"><ChevronDownOutline /></n-icon></template>
                  </n-button>
                </div>

                <!-- 字段名 -->
                <div class="field-name" :title="f.name + ' (' + f.type + ')'">
                  <span class="field-name-text">{{ f.name }}</span>
                  <span v-if="f.key === 'PRI'" class="field-badge pk">PK</span>
                  <span v-if="f.key === 'MUL'" class="field-badge mul">IDX</span>
                </div>

                <!-- 组件类型选择器 -->
                <n-select
                  v-model:value="f.component"
                  :options="componentOptions"
                  size="small"
                  class="field-component"
                  :consistent-menu-width="false"
                  :render-option="renderComponentOption"
                />

                <!-- 注释/标签 -->
                <n-input
                  v-model:value="f.comment"
                  size="small"
                  class="field-comment"
                  placeholder="字段标签"
                />

                <!-- 搜索开关 -->
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-button
                      quaternary
                      circle
                      size="tiny"
                      :type="f.searchable ? 'primary' : 'default'"
                      @click="f.searchable = !f.searchable"
                    >
                      <template #icon><n-icon size="14"><SearchOutline /></n-icon></template>
                    </n-button>
                  </template>
                  可搜索
                </n-tooltip>
              </div>
            </div>
          </n-scrollbar>
        </n-spin>
      </template>
    </n-card>

    <!-- 右侧：代码预览与操作 -->
    <n-card size="small" class="right-panel">
      <template #header>
        <n-tabs
          v-model:value="activeTab"
          type="segment"
          size="small"
          class="preview-tabs"
          v-if="previewCode"
        >
          <n-tab-pane name="controller" tab="Controller" />
          <n-tab-pane name="vue" tab="Vue" />
          <n-tab-pane name="api" tab="API" />
          <n-tab-pane name="route" tab="Route" />
        </n-tabs>
        <span v-else class="preview-title">代码预览</span>
      </template>

      <template #header-extra>
        <n-space :size="6" v-if="selectedTable">
          <n-button size="small" @click="handlePreview" :loading="previewLoading">
            <template #icon><n-icon size="14"><EyeOutline /></n-icon></template>
            预览
          </n-button>
          <n-button size="small" type="primary" @click="handleGenerate" :loading="genLoading">
            <template #icon><n-icon size="14"><FlashOutline /></n-icon></template>
            一键生成
          </n-button>
        </n-space>
      </template>

      <template v-if="previewCode">
        <n-scrollbar style="flex:1;min-height:0">
          <pre v-if="activeTab === 'controller'" class="code-block">{{ previewCode.controller }}</pre>
          <pre v-if="activeTab === 'vue'" class="code-block">{{ previewCode.vue }}</pre>
          <pre v-if="activeTab === 'api'" class="code-block">{{ previewCode.api }}</pre>
          <pre v-if="activeTab === 'route'" class="code-block">{{ previewCode.route }}</pre>
        </n-scrollbar>
      </template>
      <template v-else>
        <n-empty description="点击「预览」查看生成的代码" style="margin-top:60px">
          <template #icon>
            <n-icon size="48" color="#ddd"><CodeSlashOutline /></n-icon>
          </template>
        </n-empty>
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import { useMessage } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import {
  EyeOutline, FlashOutline, SearchOutline,
  ChevronUpOutline, ChevronDownOutline, CodeSlashOutline,
} from '@vicons/ionicons5'
import {
  getGeneratorTablesApi,
  getGeneratorFieldsApi,
  previewGeneratorApi,
  generateCodeApi,
  getGeneratorTypesApi,
} from '@/api/generator'

const message = useMessage()

// 状态
const tableLoading = ref(false)
const fieldLoading = ref(false)
const previewLoading = ref(false)
const genLoading = ref(false)
const selectedTable = ref('')
const tableName = ref('')
const tableSearch = ref('')
const tableOptions = ref<any[]>([])
const fields = ref<any[]>([])
const previewCode = ref<any>(null)
const activeTab = ref('controller')
const componentOptions = ref<SelectOption[]>([])

// 跳过的系统字段（不在配置中显示）
const skipFields = ['id', 'create_time', 'update_time', 'delete_time']

// 过滤表列表
const filteredTables = computed(() => {
  if (!tableSearch.value) return tableOptions.value
  const kw = tableSearch.value.toLowerCase()
  return tableOptions.value.filter(
    (t: any) => t.name.toLowerCase().includes(kw) || t.comment.includes(kw)
  )
})

// 组件选择器渲染（带图标）
function renderComponentOption({ node, option }: any) {
  const iconMap: Record<string, string> = {
    'TextT': 'Aa', 'CalculatorOutline': '#', 'DocumentTextOutline': '¶',
    'ListOutline': '≡', 'ToggleOutline': '⇄', 'CalendarOutline': '📅',
    'TimeOutline': '🕐', 'RadioOutline': '○', 'CheckboxOutline': '☑',
    'CloudUploadOutline': '↑', 'ImageOutline': '🖼', 'CodeOutline': '<>',
    'CodeSlashOutline': '</>', 'ColorPaletteOutline': '●', 'StarOutline': '★',
    'OptionsOutline': '—',
  }
  return h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
    h('span', { style: { fontSize: '14px', width: '20px', textAlign: 'center' } },
      iconMap[option.icon as string] || '▢'),
    h('span', {}, option.label as string),
  ])
}

// 加载表列表
async function loadTables() {
  tableLoading.value = true
  try {
    const res = await getGeneratorTablesApi()
    tableOptions.value = res.data.list.map((t: any) => ({
      name: t.name,
      comment: t.comment,
      key: t.table,
    }))
  } finally {
    tableLoading.value = false
  }
}

// 加载组件类型
async function loadTypes() {
  try {
    const res = await getGeneratorTypesApi()
    componentOptions.value = (res.data || []).map((item: any) => ({
      label: item.label,
      value: item.value,
      icon: item.icon,
    }))
  } catch (e) { /* ignore */ }
}

// 选择表
async function handleTableSelect(table: string) {
  selectedTable.value = table
  previewCode.value = null
  fieldLoading.value = true
  try {
    const res = await getGeneratorFieldsApi(table)
    tableName.value = res.data.table
    // 为每个字段添加前端配置属性
    fields.value = (res.data.fields || [])
      .filter((f: any) => !skipFields.includes(f.name))
      .map((f: any) => ({
        ...f,
        searchable: ['varchar', 'char'].includes(f.base_type),
      }))
  } finally {
    fieldLoading.value = false
  }
}

// 移动字段位置
function moveField(idx: number, dir: number) {
  const newIdx = idx + dir
  if (newIdx < 0 || newIdx >= fields.value.length) return
  const arr = [...fields.value]
  const temp = arr[idx]
  arr[idx] = arr[newIdx]
  arr[newIdx] = temp
  fields.value = arr
}

// 预览代码
async function handlePreview() {
  if (!selectedTable.value) return
  previewLoading.value = true
  try {
    const fieldOverrides = fields.value.map((f: any) => ({
      name: f.name,
      component: f.component,
      comment: f.comment,
      searchable: f.searchable,
    }))
    const res = await previewGeneratorApi(selectedTable.value, fieldOverrides)
    previewCode.value = res.data
    activeTab.value = 'controller'
  } catch (e) {
    message.error('预览失败')
  } finally {
    previewLoading.value = false
  }
}

// 生成代码
async function handleGenerate() {
  if (!selectedTable.value) return
  genLoading.value = true
  try {
    const fieldOverrides = fields.value.map((f: any) => ({
      name: f.name,
      component: f.component,
      comment: f.comment,
      searchable: f.searchable,
    }))
    const res = await generateCodeApi(selectedTable.value, fieldOverrides)
    message.success(`生成成功！共 ${res.data.files.length} 个文件`)
    message.info(res.data.files.join(', '))
  } catch (e) {
    message.error('生成失败')
  } finally {
    genLoading.value = false
  }
}

onMounted(() => {
  loadTables()
  loadTypes()
})
</script>

<style scoped>
.generator-layout {
  display: flex;
  gap: 12px;
  height: calc(100vh - 180px);
}

.left-panel {
  width: 230px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}
.left-panel :deep(.n-card__content) {
  flex: 1;
  padding: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.center-panel {
  flex: 1;
  min-width: 320px;
  display: flex;
  flex-direction: column;
}
.center-panel :deep(.n-card__content) {
  flex: 1;
  padding: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.right-panel {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  min-width: 300px;
}
.right-panel :deep(.n-card__content) {
  flex: 1;
  padding: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.right-panel :deep(.n-card__header) {
  padding: 6px 12px;
}
.preview-tabs {
  margin-top: 2px;
}
.preview-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--n-text-color);
}

/* 表列表项 */
.table-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 6px;
  margin: 1px 0;
  transition: all 0.15s;
}
.table-item:hover { background: var(--n-color-hover); }
.table-item.active { background: var(--n-color-active); }
.table-item-main {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.table-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--n-color-target-disabled);
  flex-shrink: 0;
  transition: background 0.2s;
}
.table-dot.active { background: var(--n-color-target); }
.table-name {
  font-size: 13px;
  font-weight: 500;
  font-family: Consolas, Monaco, monospace;
  color: var(--n-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.table-comment {
  font-size: 11px;
  color: var(--n-text-color-disabled);
  flex-shrink: 0;
  margin-left: 6px;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 字段配置行 */
.field-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.field-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  border-radius: 6px;
  background: var(--n-color-target);
  transition: background 0.15s;
}
.field-row:hover { background: var(--n-color-target-hover); }
.field-row.field-skip { opacity: 0.45; }
.field-sort {
  display: flex;
  flex-direction: column;
  width: 18px;
  flex-shrink: 0;
}
.field-name {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 110px;
  flex-shrink: 0;
  min-width: 0;
}
.field-name-text {
  font-size: 12px;
  font-weight: 600;
  font-family: Consolas, Monaco, monospace;
  color: var(--n-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.field-badge {
  font-size: 9px;
  padding: 0 3px;
  border-radius: 3px;
  font-weight: 700;
  line-height: 15px;
  flex-shrink: 0;
}
.field-badge.pk { background: #fff3e0; color: #e65100; }
.field-badge.mul { background: #e3f2fd; color: #1565c0; }
.field-component {
  width: 130px;
  flex-shrink: 0;
}
.field-comment {
  flex: 1;
  min-width: 60px;
}

/* 代码区域 */
:deep(.n-code) {
  border-radius: 6px;
}
</style>
